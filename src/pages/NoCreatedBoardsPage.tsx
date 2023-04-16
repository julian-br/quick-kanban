import { useEffect, useState } from "react";
import Button from "../components/common/Button";
import CreateBoardModal from "../components/modals/CreateBoardModal";
import KanbanBoardsNav from "../components/KanbanBoardsNav";
import Navbar from "../components/common/Navbar";
import SideBar from "../components/common/SideBar";
import { useLocation } from "wouter";
import { useKanbanBoards } from "../api/kanbanBoard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

export default function NoCreatedBoardsPage() {
  const [showCreateNewBoardModal, setShowCreateNewBoardModal] = useState(false);
  const [_, setLocation] = useLocation();

  // redirect to an existing board if the user has already created one
  const boards = useKanbanBoards();

  useEffect(() => {
    if (boards.isSuccess && boards.data[0] !== undefined) {
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
                <FontAwesomeIcon className="h-3" icon={faPlus} />
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
