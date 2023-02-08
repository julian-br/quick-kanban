import { useEffect, useState } from "react";
import Button from "../components/common/Button";
import CreateBoardModal from "../components/CreateKanbanBoardModal/CreateKanbanBoardModal";
import KanbanBoardsNav from "../components/KanbanBoardsNav";
import Navbar from "../components/Navbar";
import SideBar from "../components/SideBar";
import PlusIcon from "../assets/icon-add-task.svg";
import { Redirect, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { useKanbanBoards } from "../api/kanbanBoard";

export default function NoCreatedBoardsPage() {
  const [showCreateNewBoardModal, setShowCreateNewBoardModal] = useState(false);
  const [_, setLocation] = useLocation();

  // redirect to an existing board if the user has already created one
  const boards = useKanbanBoards();

  useEffect(() => {
    if (boards.isSuccess) {
      setLocation(`/board/${boards.data[0].id}`);
    }
  }, [boards.isSuccess]);

  function handleCreateNewBoardClicked() {
    setShowCreateNewBoardModal(true);
  }

  return (
    <>
      <Navbar />
      <div className="flex-grow flex">
        <SideBar>
          <div className="mt-7">
            <h2 className="uppercase font-semibold text-slate-400 tracking-widest ml-7 mb-6">
              all boards (0)
            </h2>
            <KanbanBoardsNav
              activeBoardId=""
              onCreateNewBoardClick={handleCreateNewBoardClicked}
            />
          </div>
        </SideBar>

        <main className="w-full flex-grow bg-slate-100 flex items-center">
          <div className="mx-auto mb-32 text-center">
            <p className="text-lg font-medium text-slate-400 mb-3">
              No board has been created yet.
            </p>
            <Button
              onClick={handleCreateNewBoardClicked}
              variant="primary"
              size="large"
            >
              <div className="flex items-baseline">
                <img src={PlusIcon} alt="Plus Icon" className="h-2 mr-1" />
                <span>Create new Board</span>
              </div>
            </Button>
          </div>
        </main>
        {showCreateNewBoardModal && (
          <CreateBoardModal onClose={() => setShowCreateNewBoardModal(false)} />
        )}
      </div>
    </>
  );
}
