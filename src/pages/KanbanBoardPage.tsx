import { useState } from "react";
import { Task } from "../api/task";
import CreateBoardModal from "../features/managing-boards/CreateBoardModal";
import KanbanBoard from "../features/kanban-board/KanbanBoard";
import KanbanBoardsNav from "../features/managing-boards/KanbanBoardsNav";
import ViewTaskModal from "../features/managing-tasks/ViewTaskModal";
import { useKanbanBoard } from "../api/kanbanBoard";
import CreateOrEditTaskModal from "../features/managing-tasks/CreateOrEditTaskModal";
import Button from "../components/Button";
import ContextMenu from "../components/ContextMenu";
import DeleteBoardModal from "../features/managing-boards/DeleteBoardModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import AppShell from "../components/AppShell";
import EditBoardModal from "../features/managing-boards/EditBoardModal";
import DeleteTaskModal from "../features/managing-tasks/DeleteTaskModal";
import { useAppModalManager } from "../appModalManager";

interface KanbanBoardPageProps {
  urlParams: {
    boardId: string;
  };
}

type ActiveModal = "CreateOrEditTaskModal" | "DeleteTaskModal" | "None";

export default function KanbanBoardPage({ urlParams }: KanbanBoardPageProps) {
  const [activeModal, setActiveModal] = useState<ActiveModal>("None");
  const [selectedTask, setSelectedTask] = useState<Task>();

  const { boardId } = urlParams;

  const { showModal } = useAppModalManager();

  function closeModals() {
    setSelectedTask(undefined);
    setActiveModal("None");
  }

  return (
    <>
      <AppShell
        navBar={
          <div className="flex ml-auto gap-3">
            <AddTaskButton
              onClick={() => setActiveModal("CreateOrEditTaskModal")}
            />
            <ContextMenu>
              <ContextMenu.Entry
                onClick={() => showModal("editBoardModal", { boardId })}
              >
                Edit Board
              </ContextMenu.Entry>
              <ContextMenu.Entry
                onClick={() =>
                  showModal("deleteBoardModal", { boardId: boardId })
                }
              >
                <span className="text-danger-400">Delete Board</span>
              </ContextMenu.Entry>
            </ContextMenu>
          </div>
        }
        sideBar={<KanbanBoardsNav boardId={boardId} />}
        main={<KanbanBoard boardId={boardId} />}
      />

      <div className="flex flex-grow">
        {true && (
          <div>
            {/* Modals */}
            {selectedTask && activeModal === "DeleteTaskModal" && (
              <DeleteTaskModal
                taskId={selectedTask.id}
                onClose={closeModals}
                onCancel={() => null}
              />
            )}
          </div>
        )}
      </div>
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
