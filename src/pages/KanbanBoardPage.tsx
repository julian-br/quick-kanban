import KanbanBoard from "../features/kanban-board/KanbanBoard";
import KanbanBoardsNav from "../features/managing-boards/KanbanBoardsNav";
import Button from "../components/Button";
import SettingsMenu from "../components/SettingsMenu";
import AppShell from "../components/AppShell";
import { useAppModalManager } from "../appModalManager";
import ActiveKanabanBoardSelect from "../features/managing-boards/ActiveKanabanBoardSelect";
import { useKanbanBoardQuery } from "../api/kanbanBoard";
import { PenIcon, TrashIcon } from "lucide-react";

interface KanbanBoardPageProps {
  urlParams: {
    boardId: string;
  };
}

export default function KanbanBoardPage({ urlParams }: KanbanBoardPageProps) {
  const { boardId } = urlParams;
  const boardQuery = useKanbanBoardQuery(boardId);
  const { showModal } = useAppModalManager();

  function handleAddTaskClicked() {
    showModal("createTaskModal", { boardId });
  }

  function handleEditBoardClicked() {
    showModal("editBoardModal", { boardId });
  }

  function handleDelteBoardClicked() {
    showModal("deleteBoardModal", { boardId });
  }

  return (
    <>
      <AppShell
        navBarContent={
          <div className="flex items-center  justify-between w-full">
            <div className="text-xl ml-4 pl-4 border-l border-slate-300/30 text-white hidden md:block">
              {boardQuery.data?.name}
            </div>
            <ActiveKanabanBoardSelect
              className="block ml-4 md:hidden"
              activeBoardId={boardId}
            />
            <div className="flex items-center gap-2">
              <AddTaskButton onClick={handleAddTaskClicked} />
              <SettingsMenu>
                <SettingsMenu.Entry onClick={handleEditBoardClicked}>
                  <PenIcon className="h-4 mr-1" />
                  <span>Edit Board</span>
                </SettingsMenu.Entry>
                <SettingsMenu.Entry onClick={handleDelteBoardClicked}>
                  <TrashIcon className="text-danger-400 h-4 mr-1" />
                  <span className="text-danger-400">Delete Board</span>
                </SettingsMenu.Entry>
              </SettingsMenu>
            </div>
          </div>
        }
        sideBarContent={<KanbanBoardsNav activeBoardId={boardId} />}
        mainContent={<KanbanBoard boardId={boardId} />}
      />
    </>
  );
}

function AddTaskButton({ onClick }: { onClick: () => void }) {
  return (
    <>
      <Button
        onClick={onClick}
        variant="primary"
        size="medium"
        className="text-2xl py-1 px-4 md:hidden flex"
      >
        <span className="mb-1">+</span>
      </Button>
      <Button
        onClick={onClick}
        className="hidden md:block"
        variant="primary"
        size="large"
      >
        <div className="flex items-baseline gap-1">
          <span className="text-sm">+</span>
          <span>Add New Task</span>
        </div>
      </Button>
    </>
  );
}
