import Dexie, { Table } from "dexie";

export interface KanbanBoard {
  id: number;
  name: string;
  columns: KanbanBoardColumn[];
}

export interface KanbanBoardColumn {
  title: string;
  taskIds: number[];
}

export interface Task {
  id: number;
  title: string;
  description: string;
  subtasks: Subtask[];
}

export interface Subtask {
  title: string;
  isCompleted: boolean;
}

class DBWithTypeScriptSchema extends Dexie {
  boards!: Table<KanbanBoard>;
  tasks!: Table<Task>;

  constructor() {
    super("kanban-board-db");
    this.version(4).stores({
      boards: "++id, name",
      tasks: "++id",
    });
  }
}

export const db = new DBWithTypeScriptSchema();
