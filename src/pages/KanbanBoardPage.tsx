import { useMemo, useState } from "react";
import { useQuery } from "react-query";
import { useLocation, useRoute } from "wouter";
import {
  getKanbanBoardsOverview,
  fetchKanbanBoardById,
  kanbanBoardKey,
} from "../api/kanbanBoard";
import CreateBoardModal from "../components/CreateKanbanBoardModal/CreateKanbanBoardModal";
import KanbanBoard from "../components/KanbanBoard/KanbanBoard";
import KanbanBoardsNav from "../components/KanbanBoardsNav";
import Navbar from "../components/Navbar";
import SideBar from "../components/SideBar";

interface Props {
  urlParams: {
    boardId: string;
  };
}

export default function KanbanBoardPage({ urlParams }: Props) {
  const [showModal, setShowModal] = useState(false);

  const { boardId } = urlParams;

  const activeBoardQuery = useQuery(kanbanBoardKey(boardId), () =>
    fetchKanbanBoardById(boardId)
  );
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
              boardData={activeBoardQuery.data}
              onTaskClick={(taskData) => console.log(taskData, "clicked")}
              onCreateNewBoardClick={() =>
                console.log("create new board clicked")
              }
            />
          </main>
        )}
        {showModal && <CreateBoardModal onClose={() => setShowModal(false)} />}
      </div>
    </>
  );
}
