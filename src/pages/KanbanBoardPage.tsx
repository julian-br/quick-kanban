import { useState } from "react";
import { Task } from "../api/task";
import CreateBoardModal from "../components/CreateKanbanBoardModal";
import KanbanBoard from "../components/KanbanBoard/KanbanBoard";
import KanbanBoardsNav from "../components/KanbanBoardsNav";
import Navbar from "../components/Navbar";
import SideBar from "../components/SideBar";
import ViewTaskModal from "../components/ViewTaskModal/ViewTaskModal";
import { useKanbanBoard } from "../api/kanbanBoard";
import CreateTaskModal from "../components/CreateTaskModal";
import Button from "../components/common/Button";
import PlusIcon from "../assets/icon-add-task.svg";
import ContextMenu from "../components/common/ContextMenu";

interface Props {
  urlParams: {
    boardId: string;
  };
}

type modals = "CreateTaskModal" | "CreateBoardModal" | "ViewTaskModal" | "None";

export default function KanbanBoardPage({ urlParams }: Props) {
  const [activeModal, setActiveModal] = useState<modals>("None");
  const [selectedTask, setSelectedTask] = useState<Task>();

  const { boardId } = urlParams;

  const activeBoard = useKanbanBoard(boardId);

  function handleTaskClicked(taskData: Task) {
    setSelectedTask(taskData);
    setActiveModal("ViewTaskModal");
  }

  function closeAllModals() {
    setActiveModal("None");
  }

  return (
    <>
      <Navbar>
        <Navbar.Controls>
          <AddTaskButton onClick={() => setActiveModal("CreateTaskModal")} />
          <ContextMenu>
            <ContextMenu.Entry onClick={() => console.log("entry clicked")}>
              Edit Board
            </ContextMenu.Entry>
            <ContextMenu.Entry onClick={() => console.log("entry clicked")}>
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
              board={activeBoard.data}
              onTaskClick={handleTaskClicked}
              onCreateNewBoardClick={() =>
                console.log("create new board clicked")
              }
            />
          </main>
        )}

        {activeBoard.isSuccess && (
          <div>
            {activeModal === "CreateBoardModal" && (
              <CreateBoardModal onClose={closeAllModals} />
            )}
            {activeModal === "CreateTaskModal" && (
              <CreateTaskModal
                board={activeBoard.data}
                onClose={closeAllModals}
              />
            )}
            {selectedTask && activeModal === "ViewTaskModal" && (
              <ViewTaskModal
                onClose={closeAllModals}
                task={selectedTask}
                boardColumns={activeBoard.data.columns}
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
        <img src={PlusIcon} alt="Plus Icon" className="h-2 mr-1" />
        <span>Add New Task</span>
      </div>
    </Button>
  );
}
