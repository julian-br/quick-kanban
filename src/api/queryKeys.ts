const BOARDS_BASE_KEY = "kanban-boards";
const TASK_BASE_KEY = "kanban-task";

export function kanbanBoardQueryKey(boardId?: string) {
  return boardId ? [BOARDS_BASE_KEY, boardId] : [BOARDS_BASE_KEY];
}

export function taskQueryKey(taskId?: string) {
  return taskId ? [TASK_BASE_KEY, taskId] : [TASK_BASE_KEY];
}
