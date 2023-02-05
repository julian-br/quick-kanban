import { useMemo, useState } from "react";
import KanbanBoardsNav from "./components/KanbanBoardsNav";
import KanbanBoard from "./components/KanbanBoard/KanbanBoard";
import Navbar from "./components/Navbar";
import SideBar from "./components/SideBar";
import BoardsData from "./data.json";
import "./index.css";
import CreateBoardModal from "./components/CreateBoardModal/CreateBoardModal";
import { getAllBoardNames, getBoardById } from "./api/kanbanBoard";

function App() {
  const [activeBoardId, setActiveBoardId] = useState("1");
  const [showModal, setShowModal] = useState(false);

  const activeBoard = useMemo(
    () => getBoardById(activeBoardId),
    [activeBoardId]
  );

  const allBoardNames = getAllBoardNames();
  const boardNavEntries = useMemo(
    () =>
      allBoardNames.map((board) => {
        return {
          id: board.id,
          name: board.name,
          isActive: activeBoardId === board.id ? true : false,
        };
      }),
    [activeBoardId]
  );

  function handleBoardNavEntryClicked(id: string) {
    setActiveBoardId(id);
  }

  const amountOfBoards = allBoardNames.length;

  return (
    <div className="font-jakarta min-h-screen">
      <Navbar />
      <div className="flex">
        <SideBar>
          <div className="mt-7">
            <h2 className="uppercase font-semibold text-slate-400 tracking-widest ml-7 mb-6">
              all boards ({amountOfBoards})
            </h2>
            <KanbanBoardsNav
              navEntries={boardNavEntries}
              onNavEntryClick={handleBoardNavEntryClicked}
              onCreateNewBoardClick={() => setShowModal(true)}
            />
          </div>
        </SideBar>

        <main className="w-full h-full">
          <KanbanBoard
            boardData={activeBoard!}
            onTaskClick={(taskData) => console.log(taskData, "clicked")}
            onCreateNewBoardClick={() =>
              console.log("create new board clicked")
            }
          />
          {showModal && (
            <CreateBoardModal onClose={() => setShowModal(false)} />
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
