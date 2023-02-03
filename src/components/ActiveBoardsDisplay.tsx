import BoardIcon from "../assets/icon-board.svg";
import BoardIconActive from "../assets/icon-board-active.svg";
import BoardIconPrimary from "../assets/icon-board-primary.svg";
import PlusIconPrimary from "../assets/icon-add-task-primary.svg";

function BoardOption({
  title: name,
  isActive,
}: {
  title: string;
  isActive: boolean;
}) {
  const activeClassList = "text-white bg-primary";
  const notActiveClassList =
    "text-slate-400 hover:text-primary hover:bg-secondary-light";

  return (
    <button
      className={`w-72 py-4 font-semibold text-lg  rounded-r-full px-7 flex ${
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
    </button>
  );
}

function CreateNewBoardButton({ onClick }: { onClick: () => void }) {
  return (
    <button
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
          <img src={PlusIconPrimary} alt="plus icon" className="h-3 mr-1" />
          <span className=" text-primary">Create New Board</span>
        </div>
      </div>
    </button>
  );
}

interface BoardHeader {
  id: string;
  name: string;
  isActive: boolean;
}

interface Props {
  boardHeaders: BoardHeader[];
}

export default function ActiveBoardsDisplay({ boardHeaders }: Props) {
  return (
    <div>
      <div>
        {boardHeaders.map((boardHeader) => (
          <BoardOption
            title={boardHeader.name}
            isActive={boardHeader.isActive}
          />
        ))}
      </div>
      <CreateNewBoardButton onClick={() => null} />
    </div>
  );
}
