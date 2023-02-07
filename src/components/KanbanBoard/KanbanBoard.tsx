import { KanbanBoardData, KanbanTaskData } from "../../api/kanbanBoard";
import KanbanBoardColumn from "./KanbanBoardColumn";
import Button from "../common/Button";

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

interface Props {
  boardData: KanbanBoardData;
  onTaskClick?: (taskData: KanbanTaskData) => void;
  onCreateNewBoardClick?: () => void;
}

export default function KanbanBoard({
  boardData,
  onTaskClick,
  onCreateNewBoardClick,
}: Props) {
  const columnsData = boardData.columns;

  function handleTaskClicked(taskData: KanbanTaskData) {
    if (onTaskClick !== undefined) {
      onTaskClick(taskData);
    }
  }

  function handleCreateNewBoardClicked() {
    if (onCreateNewBoardClick !== undefined) {
      onCreateNewBoardClick();
    }
  }

  return (
    <div className="h-full w-full bg-grey-light pt-7 flex px-4">
      {columnsData.map((columnData) => (
        <KanbanBoardColumn
          key={columnData.name}
          onTaskClick={handleTaskClicked}
          columnData={columnData}
        />
      ))}
      <CreateNewColumnButton onClick={handleCreateNewBoardClicked} />
    </div>
  );
}
