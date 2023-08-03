import { useEffect, useState } from "react";
import Button from "../components/Button";
import CreateBoardModal from "../features/managing-boards/CreateBoardModal";
import KanbanBoardsNav from "../features/managing-boards/KanbanBoardsNav";
import { useLocation } from "wouter";
import { useKanbanBoards } from "../api/kanbanBoard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import AppShell from "../components/AppShell";

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
      <AppShell
        sideBar={
          <div className="mt-7">
            <KanbanBoardsNav
              boardId=""
              onCreateNewBoardClick={handleCreateNewBoardClicked}
            />
          </div>
        }
        main={
          <div className="flex items-center">
            <div className="mx-auto mt-96 text-center">
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
          </div>
        }
      />
      <div>
        {showCreateNewBoardModal && (
          <CreateBoardModal onClose={() => setShowCreateNewBoardModal(false)} />
        )}
      </div>
    </>
  );
}
