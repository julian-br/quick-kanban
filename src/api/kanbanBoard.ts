import BoardsData from "../data.json";
const boardsData: KanbanBoardData[] = BoardsData.boards;

export interface KanbanBoardData {
  id: string;
  name: string;
  columns: KanbanBoardColumnData[];
}

export interface KanbanBoardColumnData {
  name: string;
  tasks: KanbanTaskData[];
}

export interface KanbanTaskData {
  title: string;
  description: string;
  status: string;
  subtasks: KanbanSubtaskData[];
}

export interface KanbanSubtaskData {
  title: string;
  isCompleted: boolean;
}

export function getAllBoardNames() {
  return boardsData.map((board) => ({
    id: board.id,
    name: board.name,
  }));
}

export function getBoardById(id: string) {
  const matchingBoard = boardsData.find((board) => board.id === id);
  if (matchingBoard === undefined) {
    throw new Error("no board with this id");
  }
  return matchingBoard;
}
