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

interface Props {
  urlParams: {
    boardId: string;
  };
}

export default function KanbanBoardPage({ urlParams }: Props) {
  const [showModal, setShowModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task>();

  const { boardId } = urlParams;

  const activeBoard = useKanbanBoard(boardId);

  function handleTaskClicked(taskData: Task) {
    setSelectedTask(taskData);
  }

  return (
    <>
      <Navbar />
      <div className="flex flex-grow">
        <SideBar>
          <div className="mt-7">
            <KanbanBoardsNav
              activeBoardId={boardId}
              onCreateNewBoardClick={() => setShowModal(true)}
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
        {showModal && <CreateBoardModal onClose={() => setShowModal(false)} />}
        {selectedTask && activeBoard.isSuccess && (
          <ViewTaskModal
            onClose={() => setSelectedTask(undefined)}
            task={selectedTask}
            boardColumns={activeBoard.data.columns}
          />
        )}
      </div>
    </>
  );
}
