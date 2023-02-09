import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Task } from "../api/task";
import CreateBoardModal from "../components/CreateKanbanBoardModal";
import KanbanBoard from "../components/KanbanBoard/KanbanBoard";
import KanbanBoardsNav from "../components/KanbanBoardsNav";
import Navbar from "../components/Navbar";
import SideBar from "../components/SideBar";
import ViewTaskModal from "../components/ViewTaskModal/ViewTaskModal";
import { useKanbanBoard } from "../api/kanbanBoard";
import CreateTaskModal from "../components/CreateTaskModal";

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
      <Navbar onAddTaskClick={() => setActiveModal("CreateTaskModal")} />
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
