import { useLiveQuery } from "dexie-react-hooks";
import { Task, db } from "./local-db";

export function useTaskQuery(taskId: number) {
  const taskQuery = useLiveQuery(
    () => db.tasks.where("id").equals(taskId).first(),
    [taskId]
  );
  return taskQuery;
}

export function useTaskMutation() {
  const postTaskMutation = (newTask: Omit<Task, "id">, forBoardId: number) =>
    db.transaction("rw", db.tasks, db.boards, async () => {
      const taskId = await db.tasks.add(newTask as Task);
      const boardToAddTaskTo = await db.boards
        .where("id")
        .equals(forBoardId)
        .first();

      boardToAddTaskTo?.columns[0].taskIds.push(taskId as number);
      await db.boards.put(boardToAddTaskTo!);
      return taskId;
    });

  const putTaskMutation = (updatedTask: Task) => db.tasks.put(updatedTask);

  //TODO: refactor
  const deleteTaskMutation = (taskToDeleteId: number) =>
    db.transaction("rw", db.tasks, db.boards, async () => {
      await db.tasks.delete(taskToDeleteId);
      const boardWhereTaskIsReferenced = await db.boards
        .filter(
          (board) =>
            board.columns.find((column) =>
              column.taskIds.includes(taskToDeleteId)
            ) !== undefined
        )
        .first();

      for (let column of boardWhereTaskIsReferenced!.columns) {
        if (column.taskIds.includes(taskToDeleteId)) {
          column.taskIds = column.taskIds.filter(
            (taskId) => taskId !== taskToDeleteId
          );
          break;
        }
      }

      await db.boards.put(boardWhereTaskIsReferenced!);
      return taskToDeleteId;
    });
  return {
    post: postTaskMutation,
    put: putTaskMutation,
    delete: deleteTaskMutation,
  };
}
