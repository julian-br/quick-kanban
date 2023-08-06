import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import TaskData from "../mock-data/tasksData.json";
let tasksData: Task[] = TaskData;

export interface Task {
  id: string;
  boardId: string;
  title: string;
  description: string;
  columnIndex: number;
  rowIndex: number;
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

  // always post a task to the first column for now
  const columnIndex = 0;
  const rowIndex = getNextAvailableRowIndex(taskToPost.boardId, columnIndex);

  const newTask = {
    ...taskToPost,
    id: taskId.toString(),
    columnIndex,
    rowIndex,
  };
  tasksData.push(newTask);
  return taskToPost;
}

async function updateTask(taskToUpdate: Task) {
  const oldTaskData = tasksData.find((task) => task.id === taskToUpdate.id);
  if (oldTaskData === undefined) {
    throw new Error("no task with this id: " + taskToUpdate.id);
  }

  const gridPostionShouldUpdate =
    taskToUpdate.columnIndex !== oldTaskData.columnIndex ||
    taskToUpdate.rowIndex !== oldTaskData.rowIndex;

  if (gridPostionShouldUpdate) {
    updateGridPostions(taskToUpdate);
  }

  const indexOfTaskToUpdate = tasksData.findIndex(
    (taskData) => taskData.id === taskToUpdate.id
  );

  /* tasksData[indexOfTaskToUpdate] = taskToUpdate;
   */
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

function getNextAvailableRowIndex(boardId: string, columnIndex: number) {
  const currentTasksInColumn = tasksData.filter(
    (task) => task.boardId === boardId && task.columnIndex === columnIndex
  );
  const currentTasksInColumnSortedByRowIndex = currentTasksInColumn.sort(
    (taskA, taskB) => taskA.rowIndex - taskB.rowIndex
  );

  return currentTasksInColumnSortedByRowIndex.at(-1)!.rowIndex + 1;
}

function findNextAvailableTaskId() {
  return parseInt(tasksData.at(-1)!.id) + 1;
}

function updateGridPostions(taskWithNewPostion: Task) {
  const allTasksOfBoard = tasksData.filter(
    (task) => (task.boardId = taskWithNewPostion.boardId)
  );

  const taskWithOldPostion = allTasksOfBoard.find(
    (task) => task.id === taskWithNewPostion.id
  )!;

  const grid: Task[][] = [];

  allTasksOfBoard.forEach((task) => {
    if (grid[task.columnIndex] === undefined) {
      grid[task.columnIndex] = [];
    }
    grid[task.columnIndex][task.rowIndex] = task;
  });

  // remove task from old postion
  grid[taskWithOldPostion.columnIndex].splice(taskWithOldPostion.rowIndex, 1);

  // add task at new postion
  grid[taskWithNewPostion.columnIndex].splice(
    taskWithNewPostion.rowIndex,
    0,
    taskWithNewPostion
  );

  //reassign inindices
  grid.forEach((_, columnIndex) => {
    grid[columnIndex].forEach((_, rowIndex) => {
      const taskInGrid = grid[columnIndex][rowIndex];
      const taskData = tasksData.find(
        (taskData) => taskData.id === taskInGrid.id
      )!;
      taskData.columnIndex = columnIndex;
      taskData.rowIndex = rowIndex;
    });
  });
}
