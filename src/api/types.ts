export interface KanbanBoard {
  id: string;
  name: string;
  columns: KanbanBoardColumn[];
}

export interface KanbanBoardColumn {
  title: string;
  taskIds: string[];
}

export interface Task {
  id: string;
  title: string;
  description: string;
  subtasks: Subtask[];
}

export interface Subtask {
  title: string;
  isCompleted: boolean;
}
