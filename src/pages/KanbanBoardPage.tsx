import { useMemo, useState } from "react";
import { useQuery } from "react-query";
import { useLocation, useRoute } from "wouter";
import { getBoardsOverview, getBoardById } from "../api/kanbanBoard";
import CreateBoardModal from "../components/CreateBoardModal/CreateBoardModal";
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

  const activeBoardQuery = useQuery(["board", boardId], () =>
    getBoardById(boardId)
  );

  const boardsOverview = getBoardsOverview();
  const boardNavEntries = useMemo(
    () =>
      boardsOverview.map((board) => {
        return {
          id: board.id,
          name: board.name,
          isActive: boardId === board.id ? true : false,
        };
      }),
    [boardId]
  );

  const amountOfBoards = boardsOverview.length;

  return (
    <>
      <Navbar />
      <div className="flex flex-grow">
        <SideBar>
          <div className="mt-7">
            <h2 className="uppercase font-semibold text-slate-400 tracking-widest ml-7 mb-6">
              all boards ({amountOfBoards})
            </h2>
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
