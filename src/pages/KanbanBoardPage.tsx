import KanbanBoard from "../features/kanban-board/KanbanBoard";
import KanbanBoardsNav from "../features/managing-boards/KanbanBoardsNav";
import Button from "../components/Button";
import ContextMenu from "../components/ContextMenu";
import AppShell from "../components/AppShell";
import { useAppModalManager } from "../appModalManager";

interface KanbanBoardPageProps {
  urlParams: {
    boardId: string;
  };
}

export default function KanbanBoardPage({ urlParams }: KanbanBoardPageProps) {
  const { boardId } = urlParams;
  const { showModal } = useAppModalManager();

  function handleAddTaskClicked() {
    showModal("createTaskModal", { boardId });
  }

  function handleEditBoardClicked() {
    showModal("editBoardModal", { boardId });
  }

  function handleDelteBoardClicked() {
    showModal("deleteBoardModal", { boardId: boardId });
  }

  return (
    <>
      <AppShell
        navBarContent={
          <div className="flex ml-auto gap-3 items-center">
            <AddTaskButton onClick={handleAddTaskClicked} />
            <ContextMenu>
              <ContextMenu.Entry onClick={handleEditBoardClicked}>
                Edit Board
              </ContextMenu.Entry>
              <ContextMenu.Entry onClick={handleDelteBoardClicked}>
                <span className="text-danger-400">Delete Board</span>
              </ContextMenu.Entry>
            </ContextMenu>
          </div>
        }
        sideBarContent={<KanbanBoardsNav boardId={boardId} />}
        mainContent={<KanbanBoard boardId={boardId} />}
      />
    </>
  );
}

function AddTaskButton({ onClick }: { onClick: () => void }) {
  return (
    <Button onClick={onClick} variant="primary" size="large">
      <div className="flex items-baseline gap-1">
        <span className="text-sm">+</span>
        <span>Add New Task</span>
      </div>
    </Button>
  );
}
