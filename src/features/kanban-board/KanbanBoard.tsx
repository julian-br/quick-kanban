import {
  KanbanBoard as KanbanBoardData,
  useKanbanBoard,
} from "../../api/kanbanBoard";
import KanbanBoardColumn from "./KanbanBoardColumn";
import Button from "../../components/Button";
import { useTasks } from "../../api/task";
import { useAppModalManager } from "../../appModalManager";

interface KanbanBoardProps {
  boardId: string;
}

export default function KanbanBoard({ boardId }: KanbanBoardProps) {
  const boardQuery = useKanbanBoard(boardId);
  const tasks = useTasks(boardId);
  const { showModal } = useAppModalManager();

  function filterTasksByColumnIndex(columnIndex: number) {
    return tasks.data?.filter((task) => task.columnIndex === columnIndex) ?? [];
  }

  function handleCreateColumnClick() {
    showModal("editBoardModal", { boardId: boardId });
  }

  return (
    <>
      {tasks.isSuccess && boardQuery.isSuccess && (
        <div className="h-full pt-7 flex px-4 select-none">
          {boardQuery.data.columns.map((columnName, columnIndex) => (
            <KanbanBoardColumn
              tasks={filterTasksByColumnIndex(columnIndex)}
              key={columnName}
              columnName={columnName}
            />
          ))}
          <CreateNewColumnButton onClick={handleCreateColumnClick} />
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
