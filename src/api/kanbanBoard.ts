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

export const kanbanBoardsOverviewKey = "kanban-boards-overview";
export function getKanbanBoardsOverview() {
  console.log("fetching overview");
  return new Promise<KanbanBoardData[]>((res) => {
    const boardOverview = boardsData.map((board) => ({
      id: board.id,
      name: board.name,
      columns: [],
    }));

    res(boardOverview);
  });
}

export const kanbanBoardKey = (boardId: string) => ["kanban-board", boardId];
export function fetchKanbanBoardById(id: string) {
  console.log("fetching board by id");
  return new Promise<KanbanBoardData>((res, rej) => {
    const matchingBoard = boardsData.find((board) => board.id === id)!;
    if (matchingBoard === undefined) {
      rej("no board with this id");
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
  return new Promise<KanbanBoardData>((res) => {
    console.log("posting board");
    const id = parseInt(boardsData.at(-1)!.id) + 1;
    const newBoard = {
      id: id.toString(),
      name,
      columns: columNames.map((columnName) => ({
        name: columnName,
        tasks: [],
      })),
    };
    boardsData.push(newBoard);
    res(newBoard);
  });
}
