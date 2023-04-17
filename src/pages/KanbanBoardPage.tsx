import { useState } from "react";
import { Task } from "../api/task";
import CreateBoardModal from "../components/modals/CreateBoardModal";
import KanbanBoard from "../components/board/KanbanBoard";
import KanbanBoardsNav from "../components/KanbanBoardsNav";
import Navbar from "../components/common/Navbar";
import SideBar from "../components/common/SideBar";
import ViewTaskModal from "../components/modals/ViewTaskModal/ViewTaskModal";
import { useKanbanBoard } from "../api/kanbanBoard";
import CreateTaskModal from "../components/modals/CreateTaskModal";
import Button from "../components/common/Button";
import ContextMenu from "../components/common/ContextMenu";
import DeleteBoardModal from "../components/modals/DeleteBoardModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

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
  | "None";

export default function KanbanBoardPage({ urlParams }: KanbanBoardPageProps) {
  const [activeModal, setActiveModal] = useState<ActiveModal>("None");
  const [selectedTask, setSelectedTask] = useState<Task>();
  const [columnToAddTaskTo, setColumnToAddTaskTo] = useState<string>();

  const { boardId } = urlParams;

  const activeBoard = useKanbanBoard(boardId);

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
      <Navbar>
        {activeBoard.isFetched && (
          <div className="text-slate-300 font-semibold text-2xl ml-20">
            {activeBoard.data?.name}
          </div>
        )}
        <Navbar.Controls>
          <AddTaskButton onClick={() => setActiveModal("CreateTaskModal")} />
          <ContextMenu>
            <ContextMenu.Entry onClick={() => console.log("entry clicked")}>
              Edit Board
            </ContextMenu.Entry>
            <ContextMenu.Entry
              onClick={() => setActiveModal("DeleteBoardModal")}
            >
              <span className="text-danger">Delete Board</span>
            </ContextMenu.Entry>
          </ContextMenu>
        </Navbar.Controls>
      </Navbar>

      <div className="flex flex-grow">
        <SideBar>
          <div className="mt-7">
            <KanbanBoardsNav
              activeBoardId={boardId}
              onCreateNewBoardClick={() => setActiveModal("CreateBoardModal")}
            />
          </div>
        </SideBar>
        {activeBoard.isSuccess && (
          <main className="w-full">
            <KanbanBoard
              onAddTaskClick={(columnName) => {
                setColumnToAddTaskTo(columnName);
                setActiveModal("CreateTaskModal");
              }}
              board={activeBoard.data}
              onTaskClick={handleTaskClicked}
            />
            {/* Modals */}
            {activeModal === "CreateBoardModal" && (
              <CreateBoardModal onClose={closeModals} />
            )}
            {activeModal === "CreateTaskModal" && (
              <CreateTaskModal
                board={activeBoard.data}
                columnName={columnToAddTaskTo}
                onClose={closeModals}
              />
            )}
            {selectedTask && activeModal === "ViewTaskModal" && (
              <ViewTaskModal
                onClose={closeModals}
                task={selectedTask}
                boardColumns={activeBoard.data.columns}
              />
            )}
            {activeModal === "DeleteBoardModal" && (
              <DeleteBoardModal
                boardId={activeBoard.data.id}
                onClose={closeModals}
              />
            )}
          </main>
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
