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
  console.log("fetching board by id");
  return new Promise<KanbanBoardData>((res, rej) => {
    const matchingBoard = boardsData.find((board) => board.id === id)!;
    if (matchingBoard === undefined) {
      rej("no board with this id");
    }
    res(matchingBoard);
  });
}

export function postBoard({
  name,
  columNames,
}: {
  name: string;
  columNames: string[];
}) {
  return new Promise<KanbanBoardData>((res) => {
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
    console.log("new board postet", newBoard);
    res(newBoard);
  });
}
