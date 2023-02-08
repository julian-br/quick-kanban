import BoardsData from "../mock-data/boardData.json";
const boardsData: KanbanBoard[] = BoardsData;

export interface KanbanBoard {
  id: string;
  name: string;
  columns: string[];
}

export const allKanbanBoardsKey = "kanban-boards";
export function fetchAllKanbanBoards() {
  return new Promise<KanbanBoard[]>((res) => {
    console.warn("fetching all kanban boards" + Math.random());
    res(boardsData);
  });
}

export const kanbanBoardKey = (boardId: string) => "kanban-board" + boardId;
export function fetchKanbanBoardById(boardId: string) {
  console.log("fetching board by id", boardId);
  return new Promise<KanbanBoard>((res) => {
    const matchingBoard = boardsData.find((board) => board.id === boardId);
    if (matchingBoard === undefined) {
      throw new Error("no board with this id");
    }
    res(matchingBoard);
  });
}

export function postKanbanBoard({
  name,
  columNames,
}: {
  name: string;
  columNames: string[];
}) {
  return new Promise<KanbanBoard>((res) => {
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
