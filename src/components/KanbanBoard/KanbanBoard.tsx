import { KanbanBoard as KanbanBoardData } from "../../api/kanbanBoard";
import KanbanBoardColumn from "./KanbanBoardColumn";
import Button from "../common/Button";
import { Task, useTasks } from "../../api/task";

interface Props {
  board: KanbanBoardData;
  onTaskClick?: (taskData: Task) => void;
  onCreateNewBoardClick?: () => void;
}

export default function KanbanBoard({
  board,
  onTaskClick,
  onCreateNewBoardClick,
}: Props) {
  const tasks = useTasks(board.id);

  function handleTaskClicked(taskData: Task) {
    if (onTaskClick !== undefined) {
      onTaskClick(taskData);
    }
  }

  function handleCreateNewBoardClicked() {
    if (onCreateNewBoardClick !== undefined) {
      onCreateNewBoardClick();
    }
  }

  function filterTasksByColumnName(column: string) {
    return tasks.data?.filter((task) => task.status === column) ?? [];
  }

  return (
    <>
      {tasks.isSuccess && (
        <div className="h-full w-full bg-grey-light pt-7 flex px-4">
          {board.columns.map((column) => (
            <KanbanBoardColumn
              tasks={filterTasksByColumnName(column)}
              key={column}
              onTaskClick={handleTaskClicked}
              columnName={column}
            />
          ))}
          <CreateNewColumnButton onClick={handleCreateNewBoardClicked} />
        </div>
      )}
    </>
  );
}

function CreateNewColumnButton({ onClick }: { onClick: () => void }) {
  return (
    <div className="w-96 mt-2 px-4">
      <Button
        variant="custom"
        onClick={onClick}
        className="w-full h-[59rem] bg-[#e3eaf5c9] rounded-xl text-slate-400 mt-11 hover:text-primary"
      >
        <span className="font-bold text-2xl mr-1">+</span>
        <span className="text-2xl font-bold ">New Column</span>
      </Button>
    </div>
  );
}
