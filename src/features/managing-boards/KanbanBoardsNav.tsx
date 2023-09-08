import Button from "../../components/Button";
import { useLocation } from "wouter";
import { useKanbanBoardsQuery } from "../../api/kanbanBoard";
import { ColumnsIcon } from "lucide-react";

import { useAppModalManager } from "../../appModalManager";

interface Props {
  activeBoardId: string;
}

export default function KanbanBoardsNav({ activeBoardId }: Props) {
  const boards = useKanbanBoardsQuery();
  const [_, setLocation] = useLocation();

  function handleNavEntryClicked(boardId: string) {
    setLocation("/board/" + boardId);
  }

  const amountOfCreatedBoards = boards.data?.length;

  return (
    <div>
      <div>
        <h2 className="uppercase font-semibold text-slate-300 tracking-widest ml-7 mb-6">
          all boards ({amountOfCreatedBoards})
        </h2>
        {boards.isSuccess && (
          <div className="mb-3 mx-4 flex-col flex gap-3">
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
      <CreateNewBoardButton />
    </div>
  );
}

function CreateNewBoardButton() {
  const { showModal } = useAppModalManager();

  return (
    <Button
      variant="custom"
      onClick={() => showModal("createBoardModal")}
      className="w-full py-4 font-semibold text-lg  px-7 flex items-center hover:bg-slate-700"
    >
      <div className="flex items-baseline text-primary-300 gap-1">
        <span className="text-sm">+</span>
        <span>Create New Board</span>
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
      className={`w-full py-2 font-semibold text-lg  rounded-lg px-4 flex ${
        isActive
          ? "text-slate-100 bg-primary-500"
          : "text-slate-400 hover:text-primary-300 hover:bg-slate-700"
      }`}
    >
      <div className="flex items-center gap-1">
        <ColumnsIcon className="h-5" />
        <span>{title}</span>
      </div>
    </Button>
  );
}
