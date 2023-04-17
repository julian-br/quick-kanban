import { KanbanBoard as KanbanBoardData } from "../../api/kanbanBoard";
import KanbanBoardColumn from "./KanbanBoardColumn";
import Button from "../common/Button";
import { Task, useTasks } from "../../api/task";

interface KanbanBoardProps {
  board: KanbanBoardData;
  onTaskClick?: (taskData: Task) => void;
  onAddTaskClick: (columnName: string) => void;
}

export default function KanbanBoard({
  board,
  onTaskClick,
  onAddTaskClick,
}: KanbanBoardProps) {
  const tasks = useTasks(board.id);

  function handleTaskClicked(taskData: Task) {
    if (onTaskClick !== undefined) {
      onTaskClick(taskData);
    }
  }

  function filterTasksByColumnName(column: string) {
    return tasks.data?.filter((task) => task.status === column) ?? [];
  }

  return (
    <>
      {tasks.isSuccess && (
        <div className="h-full w-full bg-gray-900 pt-7 flex px-4 select-none">
          {board.columns.map((column) => (
            <KanbanBoardColumn
              onAddTaskClick={onAddTaskClick}
              tasks={filterTasksByColumnName(column)}
              key={column}
              onTaskClick={handleTaskClicked}
              columnName={column}
            />
          ))}
          <CreateNewColumnButton onClick={() => null} />
        </div>
      )}
    </>
  );
}

function CreateNewColumnButton({ onClick }: { onClick: () => void }) {
  return (
    <div className="w-96 mt-2 px-4 mb-16 overflow-hidden">
      <Button
        variant="custom"
        onClick={onClick}
        className="w-full h-full mb-40 bg-slate-700 rounded-xl bg-opacity-10 text-slate-400 mt-11 hover:text-primary-300"
      >
        <span className="font-bold text-2xl mr-1">+</span>
        <span className="text-2xl font-bold ">New Column</span>
      </Button>
    </div>
  );
}
