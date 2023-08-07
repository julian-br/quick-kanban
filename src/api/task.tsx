import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import TaskData from "../mock-data/tasksData.json";
let tasksData: Task[] = TaskData;

export interface Task {
  id: string;
  boardId: string;
  title: string;
  description: string;
  subtasks: Subtask[];
}

export interface Subtask {
  title: string;
  isCompleted: boolean;
}

export const TASKS_BASE_KEY = "tasks";
export const TASKS_FOR_BOARD_KEY = (boardId: string) => [
  TASKS_BASE_KEY,
  "for-board",
  boardId,
];

export function useTask(taskId: string) {
  const taskQuery = useQuery({
    queryKey: [TASKS_BASE_KEY, taskId],
    queryFn: () => fetchTask(taskId),
  });

  return taskQuery;
}

export function useTaskMutation() {
  const queryClient = useQueryClient();
  const taskPostMutation = useMutation({
    mutationFn: postTask,
    onSuccess: (mutatedTask) =>
      queryClient.invalidateQueries({
        queryKey: TASKS_FOR_BOARD_KEY(mutatedTask.boardId),
      }),
  });

  const taskUpdateMutation = useMutation({
    mutationFn: updateTask,
    onSuccess: (mutatedTask) =>
      queryClient.invalidateQueries({
        queryKey: TASKS_FOR_BOARD_KEY(mutatedTask.boardId),
      }),
  });

  const taskDeleteMutation = useMutation({
    mutationFn: deleteTask,
    onSuccess: (deletedTask) =>
      queryClient.invalidateQueries({
        queryKey: TASKS_FOR_BOARD_KEY(deletedTask.boardId),
      }),
  });

  return {
    post: taskPostMutation,
    update: taskUpdateMutation,
    delete: taskDeleteMutation,
  };
}

export function useTasks(boardId: string) {
  const tasksQuery = useQuery({
    queryKey: TASKS_FOR_BOARD_KEY(boardId),
    queryFn: () => fetchTasksForBoard(boardId),
  });

  return tasksQuery;
}

async function fetchTask(taskId: string) {
  const matchingTask = tasksData.find((task) => task.id === taskId);
  if (matchingTask === undefined) {
    throw new Error(`No Task with the id: ${taskId}`);
  }

  return structuredClone(matchingTask);
}

async function postTask(
  taskToPost: Omit<Task, "id" | "columnIndex" | "rowIndex">
) {
  const taskId = findNextAvailableTaskId();

  const newTask = {
    ...taskToPost,
    id: taskId.toString(),
  };
  tasksData.push(newTask);
  return taskToPost;
}

async function updateTask(taskToUpdate: Task) {
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
  const indexOfTaskToDelete = tasksData.findIndex((task) => task.id === taskId);
  if (indexOfTaskToDelete === -1) {
    throw new Error("no task with this id");
  }

  const taskToDelete = tasksData[indexOfTaskToDelete];
  tasksData.splice(indexOfTaskToDelete, 1);

  return taskToDelete;
}

async function fetchTasksForBoard(boardId: string) {
  const matchingTasks = tasksData.filter(
    (taskData) => taskData.boardId === boardId
  );

  return structuredClone(matchingTasks);
}

export function deleteTasksForBoard(boardId: string) {
  const tasksDataWithDeletedTasks = tasksData.filter(
    (task) => task.boardId !== boardId
  );

  tasksData = tasksDataWithDeletedTasks;
}

function findNextAvailableTaskId() {
  const lastTaskId = tasksData.at(-1);
  return lastTaskId ? parseInt(lastTaskId.id) + 1 : "1";
}
