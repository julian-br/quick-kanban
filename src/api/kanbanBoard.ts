import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import BoardsData from "../mock-data/boardData.json";
import { Optional } from "../utils/utilityTypes";
const boardsData: KanbanBoard[] = BoardsData;

export interface KanbanBoard {
  id: string;
  name: string;
  columns: string[];
}

const BOARDS_BASE_KEY = "boards";

export function useKanbanBoard(boardId: string) {
  const kanbanBoardQuery = useQuery({
    queryKey: [BOARDS_BASE_KEY, boardId],
    queryFn: () => fetchKanbanBoardById(boardId),
  });

  return kanbanBoardQuery;
}

export function useKanbanBoards() {
  const kanbanBoardsQuery = useQuery({
    queryKey: [BOARDS_BASE_KEY],
    queryFn: fetchKanbanBoards,
  });

  return kanbanBoardsQuery;
}

export function useKanbanBoardMutation() {
  const queryClient = useQueryClient();
  const kanbanBoardMutation = useMutation({
    mutationFn: putKanbanBoard,
    onSuccess: (mutatedBoard) =>
      queryClient.invalidateQueries([BOARDS_BASE_KEY, mutatedBoard.id]),
  });

  return kanbanBoardMutation;
}

function fetchKanbanBoards() {
  return new Promise<KanbanBoard[]>((res) => {
    res(boardsData);
  });
}

function fetchKanbanBoardById(boardId: string) {
  console.log("fetching board by id", boardId);
  return new Promise<KanbanBoard>((res) => {
    const matchingBoard = boardsData.find((board) => board.id === boardId);
    if (matchingBoard === undefined) {
      throw new Error("no board with this id");
    }
    res(matchingBoard);
  });
}

function putKanbanBoard(kanbanBoard: Optional<KanbanBoard, "id">) {
  return new Promise<KanbanBoard>((res) => {
    if (kanbanBoard.id === undefined) {
      const newBoardId = parseInt(boardsData.at(-1)!.id) + 1;
      const newBoard = { ...kanbanBoard, id: newBoardId.toString() };
      boardsData.push(newBoard);
      res(newBoard as KanbanBoard);
    }

    const indexOfBoardToMutate = boardsData.findIndex(
      (boardData) => boardData.id === kanbanBoard.id
    );

    if (indexOfBoardToMutate === -1) {
      throw new Error("no board with this id found");
    }

    boardsData[indexOfBoardToMutate] = kanbanBoard as KanbanBoard;
    res(kanbanBoard as KanbanBoard);
  });
}
