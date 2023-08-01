import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import TaskData from "../mock-data/tasksData.json";
import { Optional } from "../utils/utilityTypes";
let tasksData: Task[] = TaskData;
const DELAY = 2000;

export interface Task {
  id: string;
  boardId: string;
  title: string;
  description: string;
  status: string;
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

export function useTasks(boardId: string) {
  const taskQuery = useQuery({
    queryKey: TASKS_FOR_BOARD_KEY(boardId),
    queryFn: () => fetchTasksForBoard(boardId),
  });

  return taskQuery;
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

function putTask(task: Optional<Task, "id">) {
  return new Promise<Task>((res) => {
    if (task.id === undefined) {
      const taskId = parseInt(tasksData.at(-1)!.id) + 1;
      const newTask = { ...task, id: taskId.toString() };
      tasksData.push(newTask);
      setTimeout(() => res(newTask), DELAY);
      return;
    }

    const indexOfTaskToUpdate = tasksData.findIndex(
      (taskData) => taskData.id === task.id
    );
    if (indexOfTaskToUpdate === -1) {
      throw new Error("no task with this id");
    }

    tasksData[indexOfTaskToUpdate] = task as Task;
    setTimeout(() => res(task as Task), DELAY);
  });
}

async function deleteTask(taskId: string) {
  return new Promise<Task>((res) => {
    const indexOfTaskToDelete = tasksData.findIndex(
      (task) => task.id === taskId
    );
    if (indexOfTaskToDelete === -1) {
      throw new Error("no task with this id");
    }

    const taskToDelete = tasksData[indexOfTaskToDelete];
    tasksData.splice(indexOfTaskToDelete, 1);
    setTimeout(() => res(taskToDelete), DELAY);
  });
}

function fetchTasksForBoard(boardId: string) {
  return new Promise<Task[]>((res) => {
    const matchingTasks = tasksData.filter(
      (taskData) => taskData.boardId === boardId
    );

    res(matchingTasks);
  });
}

export function deleteTasksForBoard(boardId: string) {
  const tasksDataWithDeletedTasks = tasksData.filter(
    (task) => task.boardId !== boardId
  );

  tasksData = tasksDataWithDeletedTasks;
}
