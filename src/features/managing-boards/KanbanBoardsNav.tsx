import Button from "../../components/Button";
import { useLocation } from "wouter";
import { useKanbanBoardsQuery } from "../../api/kanbanBoard";
import { ColumnsIcon } from "lucide-react";

import { useAppModalManager } from "../../appModalManager";
import ContextMenu from "../../components/ContextMenu";
import { MouseEvent } from "react";

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
                boardId={board.id}
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
  boardId,
  onClick,
}: {
  title: string;
  isActive: boolean;
  boardId: string;
  onClick: () => void;
}) {
  const { showModal } = useAppModalManager();

  function handleEditBoardClick(e: MouseEvent) {
    showModal("editBoardModal", { boardId });
  }

  function handleDelteBoardClick() {
    showModal("deleteBoardModal", { boardId });
  }

  return (
    <ContextMenu>
      <ContextMenu.Trigger>
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
        <ContextMenu.Content>
          <ContextMenu.Item onClick={handleEditBoardClick}>
            Edit Board
          </ContextMenu.Item>
          <ContextMenu.Item onClick={handleDelteBoardClick}>
            Delete Board
          </ContextMenu.Item>
        </ContextMenu.Content>
      </ContextMenu.Trigger>
    </ContextMenu>
  );
}
