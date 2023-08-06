import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import BoardsData from "../mock-data/boardData.json";
import { Optional } from "../utils/utilityTypes";
import { deleteTasksForBoard, TASKS_FOR_BOARD_KEY } from "./task";
import KanbanBoard from "../features/kanban-board/KanbanBoard";
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
  const postKanbanBoardMutation = useMutation({
    mutationFn: postKanbanBoard,
    onSuccess: () => queryClient.invalidateQueries([BOARDS_BASE_KEY]),
  });

  const updateKanabanBoardMutation = useMutation({
    mutationFn: updateKanbanBoard,
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
    post: postKanbanBoardMutation,
    update: updateKanabanBoardMutation,
    delete: deleteKanbanBoardMutation,
  };
}

async function fetchKanbanBoards() {
  return structuredClone(boardsData);
}

async function fetchKanbanBoardById(boardId: string) {
  const matchingBoard = boardsData.find((board) => board.id === boardId);
  if (matchingBoard === undefined) {
    throw new Error("fetch board: no board with the id:" + boardId);
  }
  return structuredClone(matchingBoard);
}

async function postKanbanBoard(kanbanBoard: Omit<KanbanBoard, "id">) {
  const newBoardId = findNextAvailableBoardId();

  const newBoard = { ...kanbanBoard, id: newBoardId.toString() };
  boardsData.push(newBoard);
  return newBoard as KanbanBoard;
}

async function updateKanbanBoard(kanbanBoard: KanbanBoard) {
  const indexOfBoardToMutate = boardsData.findIndex(
    (boardData) => boardData.id === kanbanBoard.id
  );

  if (indexOfBoardToMutate === -1) {
    throw new Error("delete board: no board with this id found");
  }

  boardsData[indexOfBoardToMutate] = { ...kanbanBoard } as KanbanBoard;
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

function findNextAvailableBoardId() {
  const lastBoard = boardsData.at(-1);
  const newBoardId = lastBoard !== undefined ? parseInt(lastBoard.id) + 1 : "1";

  return newBoardId;
}
