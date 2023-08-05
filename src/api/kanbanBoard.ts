import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import BoardsData from "../mock-data/boardData.json";
import { Optional } from "../utils/utilityTypes";
import { deleteTasksForBoard, TASKS_FOR_BOARD_KEY } from "./task";
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

export function useKanbanBoardsMutation() {
  const queryClient = useQueryClient();
  const putKanbanBoardMutation = useMutation({
    mutationFn: putKanbanBoard,
    onSuccess: () => queryClient.invalidateQueries([BOARDS_BASE_KEY]),
  });

  const deleteKanbanBoardMutation = useMutation({
    mutationFn: deleteKanbanBoard,
    onSuccess: (deletedBoard) => {
      queryClient.removeQueries([BOARDS_BASE_KEY, deletedBoard.id]);
      queryClient.invalidateQueries(TASKS_FOR_BOARD_KEY(deletedBoard.id));
      return queryClient.invalidateQueries([BOARDS_BASE_KEY]);
    },
  });

  return {
    put: putKanbanBoardMutation,
    delete: deleteKanbanBoardMutation,
  };
}

async function fetchKanbanBoards() {
  return boardsData;
}

async function fetchKanbanBoardById(boardId: string) {
  const matchingBoard = boardsData.find((board) => board.id === boardId);
  if (matchingBoard === undefined) {
    throw new Error("fetch board: no board with the id:" + boardId);
  }
  return matchingBoard;
}

async function putKanbanBoard(kanbanBoard: Optional<KanbanBoard, "id">) {
  if (kanbanBoard.id === undefined) {
    const previousBoard = boardsData.at(-1);
    const newBoardId =
      previousBoard !== undefined ? parseInt(previousBoard.id) + 1 : "1";
    const newBoard = { ...kanbanBoard, id: newBoardId.toString() };
    boardsData.push(newBoard);
    return newBoard as KanbanBoard;
  }

  const indexOfBoardToMutate = boardsData.findIndex(
    (boardData) => boardData.id === kanbanBoard.id
  );

  if (indexOfBoardToMutate === -1) {
    throw new Error("delete board: no board with this id found");
  }

  boardsData[indexOfBoardToMutate] = kanbanBoard as KanbanBoard;
  return kanbanBoard as KanbanBoard;
}

async function deleteKanbanBoard(boardId: string) {
  const indexOfBoardToDelete = boardsData.findIndex(
    (board) => board.id === boardId
  );

  if (indexOfBoardToDelete === -1) {
    throw new Error("delete board: no board with this id");
  }

  const deletedBoard = boardsData.splice(indexOfBoardToDelete, 1);
  deleteTasksForBoard(boardId);
  return deletedBoard[0];
}
