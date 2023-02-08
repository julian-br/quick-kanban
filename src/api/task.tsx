import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import TaskData from "../mock-data/tasksData.json";
import { Optional } from "../utils/utilityTypes";
const tasksData: Task[] = TaskData;

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

const TASKS_BASE_KEY = "tasks";
const TASKS_FOR_BOARD_KEY = (boardId: string) => [
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
  const taskMutation = useMutation({
    mutationFn: putTask,
    onSuccess: (mutatedTask) =>
      queryClient.invalidateQueries({
        queryKey: TASKS_FOR_BOARD_KEY(mutatedTask.boardId),
      }),
  });

  return taskMutation;
}

function putTask(task: Optional<Task, "id">) {
  return new Promise<Task>((res) => {
    if (task.id === undefined) {
      console.log("creating new task");
      const taskId = parseInt(tasksData.at(-1)!.id) + 1;
      const newTask = { ...task, id: taskId.toString() };
      tasksData.push(newTask);
      res(newTask);
    }

    console.log("updating task");
    const indexOfTaskToUpdate = tasksData.findIndex(
      (taskData) => taskData.id === task.id
    );
    if (indexOfTaskToUpdate === -1) {
      throw new Error("no task with this id");
    }

    tasksData[indexOfTaskToUpdate] = task as Task;
    res(task as Task);
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
