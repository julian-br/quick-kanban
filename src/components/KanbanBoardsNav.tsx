import Button from "./common/Button";
import { useLocation } from "wouter";
import { useKanbanBoards } from "../api/kanbanBoard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTableColumns } from "@fortawesome/free-solid-svg-icons";

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
          <div className="mb-3 mr-4">
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
      <div className="flex items-baseline ml-1">
        <FontAwesomeIcon
          className="h-3 mr-1 text-primary-600"
          icon={faPlus}
        ></FontAwesomeIcon>
        <span className="text-primary-500">Create New Board</span>
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
  return (
    <Button
      variant="custom"
      onClick={onClick}
      className={`w-full py-3 font-semibold text-lg  rounded-r-full px-7 flex ${
        isActive
          ? "text-white bg-primary-400"
          : "text-slate-400 hover:text-primary-500 hover:bg-primary-50"
      }`}
    >
      <div className="flex items-center">
        <FontAwesomeIcon icon={faTableColumns} />
        <span className="ml-3">{title}</span>
      </div>
    </Button>
  );
}
