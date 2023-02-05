import BoardIcon from "../assets/icon-board.svg";
import BoardIconActive from "../assets/icon-board-active.svg";
import BoardIconPrimary from "../assets/icon-board-primary.svg";
import PlusIconPrimary from "../assets/icon-add-task-primary.svg";
import Button from "./common/Button";

function BoardNavEntry({
  title: name,
  isActive,
  onClick,
}: {
  title: string;
  isActive: boolean;
  onClick: () => void;
}) {
  const activeClassList = "text-white bg-primary";
  const notActiveClassList =
    "text-slate-400 hover:text-primary hover:bg-secondary-light";

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
        <span className="ml-3">{name}</span>
      </div>
    </Button>
  );
}

function CreateNewBoardButton({ onClick }: { onClick: () => void }) {
  return (
    <Button
      variant="custom"
      onClick={onClick}
      className="w-full py-4 font-semibold text-lg  px-7 flex items-center hover:bg-secondary-light"
    >
      <div className="flex items-center">
        <img
          src={BoardIconPrimary}
          alt="Icon of a kanban board"
          className="h-5"
        />
        <div className="flex items-baseline ml-3">
          <img src={PlusIconPrimary} alt="plus icon" className="h-2 mr-1" />
          <span className=" text-primary">Create New Board</span>
        </div>
      </div>
    </Button>
  );
}

interface BoardsNavEntry {
  id: string;
  name: string;
  isActive: boolean;
}

interface Props {
  navEntries: BoardsNavEntry[];
  onNavEntryClick: (entryId: string) => void;
  onCreateNewBoardClick?: () => void;
}

export default function KanbanBoardsNav({
  navEntries,
  onNavEntryClick,
  onCreateNewBoardClick,
}: Props) {
  function handleCreateNewBoardClicked() {
    if (onCreateNewBoardClick !== undefined) {
      onCreateNewBoardClick();
    }
  }

  return (
    <div>
      <div>
        {navEntries.map((navEntry) => (
          <BoardNavEntry
            key={navEntry.id}
            onClick={() => onNavEntryClick(navEntry.id)}
            title={navEntry.name}
            isActive={navEntry.isActive}
          />
        ))}
      </div>
      <CreateNewBoardButton onClick={handleCreateNewBoardClicked} />
    </div>
  );
}
