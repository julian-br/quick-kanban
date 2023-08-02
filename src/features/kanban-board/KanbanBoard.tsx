import { KanbanBoard as KanbanBoardData } from "../../api/kanbanBoard";
import KanbanBoardColumn from "./KanbanBoardColumn";
import Button from "../../components/Button";
import { Task, useTasks } from "../../api/task";

interface KanbanBoardProps {
  board: KanbanBoardData;
  onTaskClick?: (taskData: Task) => void;
  onCreateColumnClick: () => void;
}

export default function KanbanBoard({
  board,
  onTaskClick,
  onCreateColumnClick,
}: KanbanBoardProps) {
  const tasks = useTasks(board.id);

  function handleTaskClicked(taskData: Task) {
    if (onTaskClick !== undefined) {
      onTaskClick(taskData);
    }
  }

  function filterTasksByColumnIndex(columnIndex: number) {
    return tasks.data?.filter((task) => task.columnIndex === columnIndex) ?? [];
  }

  return (
    <>
      {tasks.isSuccess && (
        <div className="h-full pt-7 flex px-4 select-none">
          {board.columns.map((columnName, columnIndex) => (
            <KanbanBoardColumn
              tasks={filterTasksByColumnIndex(columnIndex)}
              key={columnName}
              onTaskClick={handleTaskClicked}
              columnName={columnName}
            />
          ))}
          <CreateNewColumnButton onClick={onCreateColumnClick} />
        </div>
      )}
    </>
  );
}

function CreateNewColumnButton({ onClick }: { onClick: () => void }) {
  return (
    <div className="basis-96 mt-2 px-4 shrink-0 h-[80vh]">
      <Button
        variant="custom"
        onClick={onClick}
        className="w-full h-full bg-slate-700 rounded-xl bg-opacity-20 text-slate-400 mt-11 hover:text-primary-300"
      >
        <span className="font-bold text-2xl mr-1">+</span>
        <span className="text-2xl font-bold ">New Column</span>
      </Button>
    </div>
  );
}
