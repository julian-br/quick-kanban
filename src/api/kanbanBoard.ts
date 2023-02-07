import BoardsData from "../mock-data/boardData.json";
import TaskData from "../mock-data/tasksData.json";
const boardsData: KanbanBoardData[] = BoardsData;
const tasksData: KanbanTaskData[] = TaskData;

export interface KanbanBoardData {
  id: string;
  name: string;
  columns: string[];
}

export interface KanbanTaskData {
  id: string;
  boardId: string;
  title: string;
  description: string;
  status: string;
  subtasks: KanbanSubtaskData[];
}

export interface KanbanSubtaskData {
  title: string;
  isCompleted: boolean;
}

export const allKanbanBoardsKey = "kanban-boards";
export function fetchAllKanbanBoards() {
  return new Promise<KanbanBoardData[]>((res) => {
    console.warn("fetching all kanban boards" + Math.random());
    res(boardsData);
  });
}

export const kanbanBoardTaskKey = (taksId: string) => [
  "kanban-board-task",
  taksId,
];
export function updateTask(task: KanbanTaskData) {
  return new Promise<KanbanTaskData>((res) => {
    const indexOfTaskToUpdate = tasksData.findIndex(
      (taskData) => taskData.id === task.id
    );

    if (indexOfTaskToUpdate === -1) {
      throw new Error("task could not be updated");
    }

    tasksData[indexOfTaskToUpdate] = task;
    console.log("updating task", task);
    res(task);
  });
}

export const kanbanBoardKey = (boardId: string) => "kanban-board" + boardId;
export function fetchKanbanBoardById(boardId: string) {
  console.log("fetching board by id", boardId);
  return new Promise<KanbanBoardData>((res) => {
    const matchingBoard = boardsData.find((board) => board.id === boardId);
    if (matchingBoard === undefined) {
      throw new Error("no board with this id");
    }
    res(matchingBoard);
  });
}

export const tasksForKanbanBoardKey = (boardId: string) => [
  "kanban-board",
  "tasks",
  boardId,
];
export function fetchTasksForKanbanBoard(boardId: string) {
  return new Promise<KanbanTaskData[]>((res) => {
    const matchingTasks = tasksData.filter(
      (taskData) => taskData.boardId === boardId
    );

    res(matchingTasks);
  });
}

export function postKanbanBoard({
  name,
  columNames,
}: {
  name: string;
  columNames: string[];
}) {
  return new Promise<KanbanBoardData>((res) => {
    console.log("posting board");
    const id = parseInt(boardsData.at(-1)!.id) + 1;
    const newBoard = {
      id: id.toString(),
      name,
      columns: columNames,
    };
    boardsData.push(newBoard);
    res(newBoard);
  });
}
