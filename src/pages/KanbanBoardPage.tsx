import KanbanBoard from "../features/kanban-board/KanbanBoard";
import KanbanBoardsNav from "../features/managing-boards/KanbanBoardsNav";
import Button from "../components/Button";
import ContextMenu from "../components/ContextMenu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
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
        navBar={
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
        sideBar={<KanbanBoardsNav boardId={boardId} />}
        main={<KanbanBoard boardId={boardId} />}
      />
    </>
  );
}

function AddTaskButton({ onClick }: { onClick: () => void }) {
  return (
    <Button onClick={onClick} variant="primary" size="large">
      <div className="flex items-baseline">
        <FontAwesomeIcon icon={faPlus} className="h-3 mr-1" />
        <span>Add New Task</span>
      </div>
    </Button>
  );
}
