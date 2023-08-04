import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import TaskData from "../mock-data/tasksData.json";
import { Optional } from "../utils/utilityTypes";
let tasksData: Task[] = TaskData;

export interface Task {
  id: string;
  boardId: string;
  title: string;
  description: string;
  columnIndex: number;
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

export function useTasks(boardId: string) {
  const tasksQuery = useQuery({
    queryKey: TASKS_FOR_BOARD_KEY(boardId),
    queryFn: () => fetchTasksForBoard(boardId),
  });

  return tasksQuery;
}

export function useTaskMutation() {
  const queryClient = useQueryClient();
  const taskPutMutation = useMutation({
    mutationFn: putTask,
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

  return { put: taskPutMutation, delete: taskDeleteMutation };
}

async function fetchTask(taskId: string) {
  const matchingTask = tasksData.find((task) => task.id === taskId);
  if (matchingTask === undefined) {
    throw new Error(`No Task with the id: ${taskId}`);
  }

  return matchingTask;
}

async function putTask(task: Optional<Task, "id">) {
  if (task.id === undefined) {
    const taskId = parseInt(tasksData.at(-1)!.id) + 1;
    const newTask = { ...task, id: taskId.toString() };
    tasksData.push(newTask);
    return newTask;
  }

  const indexOfTaskToUpdate = tasksData.findIndex(
    (taskData) => taskData.id === task.id
  );
  if (indexOfTaskToUpdate === -1) {
    throw new Error("no task with this id");
  }

  tasksData[indexOfTaskToUpdate] = task as Task;

  return task;
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

  return matchingTasks;
}

export function deleteTasksForBoard(boardId: string) {
  const tasksDataWithDeletedTasks = tasksData.filter(
    (task) => task.boardId !== boardId
  );

  tasksData = tasksDataWithDeletedTasks;
}
