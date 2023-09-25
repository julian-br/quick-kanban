import { useLiveQuery } from "dexie-react-hooks";
import { KanbanBoard, db } from "./local-db";

export function useKanbanBoardQuery(boardId: number) {
  const kanbanBoardQuery = useLiveQuery(
    () => db.boards.where("id").equals(boardId).first(),
    [boardId]
  );

  return kanbanBoardQuery;
}

export function useKanbanBoardsQuery() {
  const kanbanBoardsQuery = useLiveQuery(() => db.boards.toArray());

  return kanbanBoardsQuery;
}

export function useKanbanBoardMutation() {
  const postKanbanBoardMutation = (newBoard: Omit<KanbanBoard, "id">) =>
    db.boards.add(newBoard as KanbanBoard); // ignore missing id in post body

  const putKanabanBoardMutation = (boardToUpdate: KanbanBoard) =>
    db.boards.put(boardToUpdate);

  const deleteKanbanBoardMutation = (boardId: number) =>
    db.transaction("rw", db.boards, db.tasks, async () => {
      const boardToDelete = await db.boards.where("id").equals(boardId).first();
      const tasksToDelete =
        boardToDelete?.columns.flatMap((column) => column.taskIds) ?? [];

      await db.tasks.bulkDelete(tasksToDelete);
      return await db.boards.delete(boardId);
    });

  return {
    post: postKanbanBoardMutation,
    put: putKanabanBoardMutation,
    delete: deleteKanbanBoardMutation,
  };
}
