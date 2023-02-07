import { useState } from "react";
import { useQuery } from "react-query";
import {
  fetchKanbanBoardById,
  kanbanBoardKey,
  KanbanTaskData,
} from "../api/kanbanBoard";
import CreateBoardModal from "../components/CreateKanbanBoardModal/CreateKanbanBoardModal";
import KanbanBoard from "../components/KanbanBoard/KanbanBoard";
import KanbanBoardsNav from "../components/KanbanBoardsNav";
import Navbar from "../components/Navbar";
import SideBar from "../components/SideBar";
import ViewTaskModal from "../components/ViewTaskModal/ViewTaskModal";

interface Props {
  urlParams: {
    boardId: string;
  };
}

export default function KanbanBoardPage({ urlParams }: Props) {
  const [showModal, setShowModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState<KanbanTaskData>();

  const { boardId } = urlParams;

  const activeBoardQuery = useQuery(kanbanBoardKey(boardId), () =>
    fetchKanbanBoardById(boardId)
  );

  function handleTaskClicked(taskData: KanbanTaskData) {
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

        {activeBoardQuery.isSuccess && (
          <main className="w-full">
            <KanbanBoard
              board={activeBoardQuery.data}
              onTaskClick={handleTaskClicked}
              onCreateNewBoardClick={() =>
                console.log("create new board clicked")
              }
            />
          </main>
        )}
        {showModal && <CreateBoardModal onClose={() => setShowModal(false)} />}
        {selectedTask && activeBoardQuery.isSuccess && (
          <ViewTaskModal
            boardId={activeBoardQuery.data.id}
            onClose={() => setSelectedTask(undefined)}
            task={selectedTask}
            boardColumns={activeBoardQuery.data.columns}
          />
        )}
      </div>
    </>
  );
}
