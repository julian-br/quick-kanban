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

interface KanbanBoardPageProps {
  urlParams: {
    boardId: string;
  };
}

type ActiveModal =
  | "CreateOrEditTaskModal"
  | "CreateBoardModal"
  | "DeleteTaskModal"
  | "DeleteBoardModal"
  | "EditBoardModal"
  | "None";

export default function KanbanBoardPage({ urlParams }: KanbanBoardPageProps) {
  const [activeModal, setActiveModal] = useState<ActiveModal>("None");
  const [selectedTask, setSelectedTask] = useState<Task>();

  const { boardId } = urlParams;

  const activeBoardQuery = useKanbanBoard(boardId);

  function closeModals() {
    setSelectedTask(undefined);
    setActiveModal("None");
  }

  return (
    <>
      <Button
        variant="primary"
        onClick={() => {
          /* modalManager.showModal("", { onClose: () => null }); */
        }}
      >
        create
      </Button>
      <AppShell
        navBar={
          <div className="flex ml-auto gap-3">
            <AddTaskButton
              onClick={() => setActiveModal("CreateOrEditTaskModal")}
            />
            <ContextMenu>
              <ContextMenu.Entry
                onClick={() => setActiveModal("EditBoardModal")}
              >
                Edit Board
              </ContextMenu.Entry>
              <ContextMenu.Entry
                onClick={() => setActiveModal("DeleteBoardModal")}
              >
                <span className="text-danger-400">Delete Board</span>
              </ContextMenu.Entry>
            </ContextMenu>
          </div>
        }
        sideBar={<KanbanBoardsNav boardId={boardId} />}
        main={
          activeBoardQuery.isSuccess && (
            <KanbanBoard
              onCreateColumnClick={() => setActiveModal("EditBoardModal")}
              board={activeBoardQuery.data}
            />
          )
        }
      />

      <div className="flex flex-grow">
        {activeBoardQuery.isSuccess && (
          <div>
            {/* Modals */}
            {activeModal === "CreateBoardModal" && (
              <CreateBoardModal onClose={closeModals} />
            )}
            {activeModal === "CreateOrEditTaskModal" && (
              <CreateOrEditTaskModal
                board={activeBoardQuery.data}
                selectedTask={selectedTask}
                onClose={closeModals}
              />
            )}
            {selectedTask && activeModal === "DeleteTaskModal" && (
              <DeleteTaskModal
                taskId={selectedTask.id}
                onClose={closeModals}
                onCancel={() => null}
              />
            )}
            {activeModal === "DeleteBoardModal" && (
              <DeleteBoardModal
                boardId={activeBoardQuery.data.id}
                onClose={closeModals}
              />
            )}
            {activeModal === "EditBoardModal" && (
              <EditBoardModal onClose={closeModals} boardId={boardId} />
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
