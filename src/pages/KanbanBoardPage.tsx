import { useState } from "react";
import { Task } from "../api/task";
import CreateBoardModal from "../features/managing-boards/CreateBoardModal";
import KanbanBoard from "../features/kanban-board/KanbanBoard";
import KanbanBoardsNav from "../features/managing-boards/KanbanBoardsNav";
import ViewTaskModal from "../features/managing-tasks/ViewTaskModal";
import { useKanbanBoard } from "../api/kanbanBoard";
import CreateTaskModal from "../features/managing-tasks/CreateOrEditTaskModal";
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
  | "ViewTaskModal"
  | "DeleteTaskModal"
  | "DeleteBoardModal"
  | "EditBoardModal"
  | "None";

export default function KanbanBoardPage({ urlParams }: KanbanBoardPageProps) {
  const [activeModal, setActiveModal] = useState<ActiveModal>("None");
  const [selectedTask, setSelectedTask] = useState<Task>();

  const { boardId } = urlParams;

  const activeBoardQuery = useKanbanBoard(boardId);

  function handleTaskClicked(taskData: Task) {
    setSelectedTask(taskData);
    setActiveModal("ViewTaskModal");
  }

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
        sideBar={
          <KanbanBoardsNav
            activeBoardId={boardId}
            onCreateNewBoardClick={() => setActiveModal("CreateBoardModal")}
          />
        }
        main={
          activeBoardQuery.isSuccess && (
            <KanbanBoard
              onCreateColumnClick={() => setActiveModal("EditBoardModal")}
              board={activeBoardQuery.data}
              onTaskClick={handleTaskClicked}
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
              <CreateTaskModal
                board={activeBoardQuery.data}
                onClose={closeModals}
              />
            )}
            {selectedTask && activeModal === "ViewTaskModal" && (
              <ViewTaskModal
                onClose={closeModals}
                onDeleteTaskClick={() => setActiveModal("DeleteTaskModal")}
                task={selectedTask}
                boardColumns={activeBoardQuery.data.columns}
              />
            )}
            {selectedTask && activeModal === "DeleteTaskModal" && (
              <DeleteTaskModal
                taskId={selectedTask.id}
                onClose={closeModals}
                onCancel={() => {
                  setActiveModal("ViewTaskModal");
                }}
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
