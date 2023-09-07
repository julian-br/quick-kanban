import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { boardsData, tasksData } from "../mock-data/mockData";
import { Task } from "./types";
import { kanbanBoardQueryKey, taskQueryKey } from "./queryKeys";

export function useTaskQuery(taskId: string) {
  const taskQuery = useQuery({
    queryKey: taskQueryKey(taskId),
    queryFn: () => fetchTask(taskId),
  });

  return taskQuery;
}

export function useTaskMutation() {
  const queryClient = useQueryClient();

  const postTaskMutation = useMutation({
    mutationFn: postTask,
    onSuccess: async (postedTask, { boardId }) => {
      queryClient.removeQueries({
        queryKey: taskQueryKey(postedTask.id),
      });
      queryClient.invalidateQueries({
        queryKey: kanbanBoardQueryKey(boardId),
      });
    },
  });

  const putTaskMutation = useMutation({
    mutationFn: putTask,
    onSuccess: (mutatedTask) =>
      queryClient.invalidateQueries({
        queryKey: taskQueryKey(mutatedTask.id),
      }),
  });

  const deleteTaskMutation = useMutation({
    mutationFn: deleteTask,
    onSuccess: (boardOfDeltedTask, taskId) => {
      queryClient.invalidateQueries({
        queryKey: kanbanBoardQueryKey(boardOfDeltedTask),
      });
      queryClient.removeQueries({
        queryKey: taskQueryKey(taskId),
      });
    },
  });

  return {
    post: postTaskMutation,
    put: putTaskMutation,
    delete: deleteTaskMutation,
  };
}

async function fetchTask(taskId: string) {
  const matchingTask = tasksData.find((task) => task.id === taskId);
  if (matchingTask === undefined) {
    throw new Error(`No Task with the id: ${taskId}`);
  }

  return structuredClone(matchingTask);
}

type TaskPostBody = Omit<Task, "id" | "columnIndex" | "rowIndex">;

async function postTask({
  taskPostBody,
  boardId,
}: {
  taskPostBody: TaskPostBody;
  boardId: string;
}) {
  const newTaskId = findNextAvailableTaskId();
  const newTask = {
    ...taskPostBody,
    id: newTaskId.toString(),
  };

  const matchingBoard = boardsData.find((board) => board.id === boardId);
  if (matchingBoard === undefined) {
    throw new Error("no board with the id: " + boardId);
  }

  matchingBoard.columns[0].taskIds.push(newTaskId);
  tasksData.push(newTask);

  return newTask;
}

async function putTask(taskToUpdate: Task) {
  const oldTaskData = tasksData.find((task) => task.id === taskToUpdate.id);
  if (oldTaskData === undefined) {
    throw new Error("no task with this id: " + taskToUpdate.id);
  }

  const indexOfTaskToUpdate = tasksData.findIndex(
    (taskData) => taskData.id === taskToUpdate.id
  );

  tasksData[indexOfTaskToUpdate] = taskToUpdate;

  return taskToUpdate;
}

async function deleteTask(taskId: string) {
  for (const board of boardsData) {
    for (const column of board.columns) {
      const indexOfTaskId = column.taskIds.indexOf(taskId);
      if (indexOfTaskId !== -1) {
        column.taskIds.splice(indexOfTaskId, 1);
        return board.id;
      }
    }
  }

  throw new Error("task could not be deleted");
}

function findNextAvailableTaskId() {
  const lastTaskId = tasksData.at(-1);
  return lastTaskId ? (parseInt(lastTaskId.id) + 1).toString() : "1";
}
