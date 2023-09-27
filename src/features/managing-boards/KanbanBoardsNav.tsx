import Button from "../../components/Button";
import { useLocation } from "wouter";
import { useKanbanBoardsQuery } from "../../api/kanbanBoard";
import { ColumnsIcon } from "lucide-react";

import { useAppModalManager } from "../../appModalManager";
import ContextMenu from "../../components/ContextMenu";
import { KanbanBoard } from "../../api/local-db";

interface KanbanBoardsNavProps {
  activeBoardId?: number;
}

export default function KanbanBoardsNav({
  activeBoardId,
}: KanbanBoardsNavProps) {
  const boardsQuery = useKanbanBoardsQuery();

  const amountOfCreatedBoards = boardsQuery?.length ?? 0;
  return (
    <div>
      <div>
        <h2 className="uppercase font-semibold text-slate-300 tracking-widest ml-7 mb-6">
          all boards ({amountOfCreatedBoards})
        </h2>
        {boardsQuery !== undefined && amountOfCreatedBoards > 0 && (
          <div className="mb-6 mx-4 flex-col flex gap-3">
            {boardsQuery.map((board) => (
              <BoardNavEntry
                key={board.id}
                board={board}
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
      className="w-full py-4 font-semibold text-lg text-primary-300  px-7 flex items-center hover:text-primary-200 hover:bg-slate-800"
    >
      <div className="flex items-baseline  gap-1">
        <span className="text-sm">+</span>
        <span>Create New Board</span>
      </div>
    </Button>
  );
}

function BoardNavEntry({
  isActive,
  board,
}: {
  isActive: boolean;
  board: KanbanBoard;
}) {
  const { showModal } = useAppModalManager();
  const [_, setLocation] = useLocation();

  function handleEditBoardClick() {
    showModal("editBoardModal", { boardId: board.id });
  }

  function handleDeleteBoardClick() {
    showModal("deleteBoardModal", { boardId: board.id });
  }

  function handleNavEntryClick() {
    setLocation("/board/" + board.id);
  }

  return (
    <ContextMenu>
      <ContextMenu.Trigger>
        <Button
          variant="custom"
          onClick={handleNavEntryClick}
          className={`w-full py-2 font-semibold text-lg  rounded-lg px-4 flex ${
            isActive
              ? "text-slate-100 bg-primary-500"
              : "text-slate-400 hover:text-slate-200 hover:bg-slate-800"
          }`}
        >
          <div className="flex items-center gap-1">
            <ColumnsIcon className="h-5" />
            <span>{board.name}</span>
          </div>
        </Button>
        <ContextMenu.Content>
          <ContextMenu.Item onClick={handleEditBoardClick}>
            Edit Board
          </ContextMenu.Item>
          <ContextMenu.Item onClick={handleDeleteBoardClick}>
            Delete Board
          </ContextMenu.Item>
        </ContextMenu.Content>
      </ContextMenu.Trigger>
    </ContextMenu>
  );
}
