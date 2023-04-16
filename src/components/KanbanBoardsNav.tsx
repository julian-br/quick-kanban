import BoardIcon from "../assets/icon-board.svg";
import BoardIconActive from "../assets/icon-board-active.svg";
import BoardIconPrimary from "../assets/icon-board-primary.svg";
import PlusIconPrimary from "../assets/icon-add-task-primary.svg";
import Button from "./common/Button";
import { useLocation } from "wouter";
import { useKanbanBoards } from "../api/kanbanBoard";
interface Props {
  activeBoardId: string;
  onCreateNewBoardClick?: () => void;
}

export default function KanbanBoardsNav({
  activeBoardId,
  onCreateNewBoardClick,
}: Props) {
  const boards = useKanbanBoards();
  const [_, setLocation] = useLocation();

  function handleCreateNewBoardClicked() {
    if (onCreateNewBoardClick !== undefined) {
      onCreateNewBoardClick();
    }
  }

  function handleNavEntryClicked(boardId: string) {
    setLocation("/board/" + boardId);
  }

  const amountOfCreatedBoards = boards.data?.length;

  return (
    <div>
      <div>
        <h2 className="uppercase font-semibold text-slate-400 tracking-widest ml-7 mb-6">
          all boards ({amountOfCreatedBoards})
        </h2>
        {boards.isSuccess && (
          <div className="mb-3">
            {boards.data.map((board) => (
              <BoardNavEntry
                key={board.id}
                onClick={() => handleNavEntryClicked(board.id)}
                title={board.name}
                isActive={board.id === activeBoardId}
              />
            ))}
          </div>
        )}
      </div>
      <CreateNewBoardButton onClick={handleCreateNewBoardClicked} />
    </div>
  );
}

function CreateNewBoardButton({ onClick }: { onClick: () => void }) {
  return (
    <Button
      variant="custom"
      onClick={onClick}
      className="w-full py-4 font-semibold text-lg  px-7 flex items-center hover:bg-primary-50"
    >
      <div className="flex items-center">
        <img
          src={BoardIconPrimary}
          alt="Icon of a kanban board"
          className="h-5"
        />
        <div className="flex items-baseline ml-3">
          <img src={PlusIconPrimary} alt="plus icon" className="h-2 mr-1" />
          <span className="text-primary-500">Create New Board</span>
        </div>
      </div>
    </Button>
  );
}

function BoardNavEntry({
  title,
  isActive,
  onClick,
}: {
  title: string;
  isActive: boolean;
  onClick: () => void;
}) {
  const activeClassList = "text-white bg-primary-400";
  const notActiveClassList =
    "text-slate-400 hover:text-primary-500 hover:bg-primary-50";

  return (
    <Button
      variant="custom"
      onClick={onClick}
      className={`w-72 py-3 font-semibold text-lg  rounded-r-full px-7 flex ${
        isActive ? activeClassList : notActiveClassList
      }`}
    >
      <div className="flex items-center">
        <img
          src={isActive ? BoardIconActive : BoardIcon}
          alt="Icon of a kanban board"
          className="h-5"
        />
        <span className="ml-3">{title}</span>
      </div>
    </Button>
  );
}
