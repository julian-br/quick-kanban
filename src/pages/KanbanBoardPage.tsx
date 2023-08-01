import { useState } from "react";
import { Task } from "../api/task";
import CreateBoardModal from "../features/managing-boards/CreateBoardModal";
import KanbanBoard from "../features/kanban-board/KanbanBoard";
import KanbanBoardsNav from "../features/managing-boards/KanbanBoardsNav";
import ViewTaskModal from "../features/managing-tasks/ViewTaskModal";
import { useKanbanBoard } from "../api/kanbanBoard";
import CreateTaskModal from "../features/managing-tasks/CreateTaskModal";
import Button from "../components/Button";
import ContextMenu from "../components/ContextMenu";
import DeleteBoardModal from "../features/managing-boards/DeleteBoardModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { CreateColumnModal } from "../features/managing-columns/CreateColumnModal";
import AppShell from "../components/AppShell";

interface KanbanBoardPageProps {
  urlParams: {
    boardId: string;
  };
}

type ActiveModal =
  | "CreateTaskModal"
  | "CreateBoardModal"
  | "ViewTaskModal"
  | "DeleteBoardModal"
  | "CreateColumnModal"
  | "None";

export default function KanbanBoardPage({ urlParams }: KanbanBoardPageProps) {
  const [activeModal, setActiveModal] = useState<ActiveModal>("None");
  const [selectedTask, setSelectedTask] = useState<Task>();
  const [columnToAddTaskTo, setColumnToAddTaskTo] = useState<string>();

  const { boardId } = urlParams;

  const activeBoardQuery = useKanbanBoard(boardId);

  function handleTaskClicked(taskData: Task) {
    setSelectedTask(taskData);
    setActiveModal("ViewTaskModal");
  }

  function closeModals() {
    setSelectedTask(undefined);
    setColumnToAddTaskTo(undefined);
    setActiveModal("None");
  }

  return (
    <>
      <AppShell
        navBar={
          <div className="flex ml-auto gap-3">
            <AddTaskButton onClick={() => setActiveModal("CreateTaskModal")} />
            <ContextMenu>
              <ContextMenu.Entry onClick={() => console.log("entry clicked")}>
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
              onAddTaskClick={(columnName) => {
                setColumnToAddTaskTo(columnName);
                setActiveModal("CreateTaskModal");
              }}
              onCreateColumnClick={() => setActiveModal("CreateColumnModal")}
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
            {activeModal === "CreateTaskModal" && (
              <CreateTaskModal
                board={activeBoardQuery.data}
                columnName={columnToAddTaskTo}
                onClose={closeModals}
              />
            )}
            {selectedTask && activeModal === "ViewTaskModal" && (
              <ViewTaskModal
                onClose={closeModals}
                task={selectedTask}
                boardColumns={activeBoardQuery.data.columns}
              />
            )}
            {activeModal === "DeleteBoardModal" && (
              <DeleteBoardModal
                boardId={activeBoardQuery.data.id}
                onClose={closeModals}
              />
            )}
            {activeModal === "CreateColumnModal" && (
              <CreateColumnModal
                onClose={closeModals}
                board={activeBoardQuery.data}
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
