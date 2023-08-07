import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { boardsData } from "../mock-data/mockData";
import { KanbanBoard } from "./types";
import { kanbanBoardQueryKey } from "./queryKeys";

export function useKanbanBoardQuery(boardId: string) {
  const kanbanBoardQuery = useQuery({
    queryKey: kanbanBoardQueryKey(boardId),
    queryFn: () => fetchKanbanBoardById(boardId),
  });

  return kanbanBoardQuery;
}

export function useKanbanBoardsQuery() {
  const kanbanBoardsQuery = useQuery({
    queryKey: kanbanBoardQueryKey(),
    queryFn: fetchKanbanBoards,
  });

  return kanbanBoardsQuery;
}

export function useKanbanBoardMutation() {
  const queryClient = useQueryClient();
  const postKanbanBoardMutation = useMutation({
    mutationFn: postKanbanBoard,
    onSuccess: () => queryClient.invalidateQueries(kanbanBoardQueryKey()),
  });

  const updateKanabanBoardMutation = useMutation({
    mutationFn: updateKanbanBoard,
    onSuccess: () => queryClient.invalidateQueries(kanbanBoardQueryKey()),
  });

  const deleteKanbanBoardMutation = useMutation({
    mutationFn: deleteKanbanBoard,
    onSuccess: (deletedBoard) => {
      queryClient.removeQueries(kanbanBoardQueryKey(deletedBoard.id));
      return queryClient.invalidateQueries(kanbanBoardQueryKey());
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
    throw new Error("no board with this id found");
  }

  boardsData[indexOfBoardToMutate] = { ...kanbanBoard };
  return kanbanBoard;
}

async function deleteKanbanBoard(boardId: string) {
  const indexOfBoardToDelete = boardsData.findIndex(
    (board) => board.id === boardId
  );

  if (indexOfBoardToDelete === -1) {
    throw new Error("delete board: no board with this id");
  }

  const deletedBoard = boardsData.splice(indexOfBoardToDelete, 1);
  return deletedBoard[0];
}

export function deleteTaskFromColumn(deleteTaskId: string, boardId: string) {
  const boardToDeleteTaskFrom = boardsData.find(
    (board) => board.id === boardId
  );

  if (boardToDeleteTaskFrom === undefined) {
    throw new Error("no board with the id: " + boardId);
  }

  boardToDeleteTaskFrom.columns.forEach((column) =>
    column.taskIds.forEach((taskId, rowIndex) => {
      if (taskId === deleteTaskId) {
        column.taskIds.splice(rowIndex, 1);
      }
    })
  );

  console.log(boardToDeleteTaskFrom);
}

function findNextAvailableBoardId() {
  const lastBoard = boardsData.at(-1);
  const newBoardId = lastBoard !== undefined ? parseInt(lastBoard.id) + 1 : "1";

  return newBoardId;
}
