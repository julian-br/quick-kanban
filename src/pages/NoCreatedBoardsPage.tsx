import { useEffect, useState } from "react";
import Button from "../components/Button";
import CreateBoardModal from "../features/managing-boards/CreateBoardModal";
import KanbanBoardsNav from "../features/managing-boards/KanbanBoardsNav";
import { useLocation } from "wouter";
import { useKanbanBoards } from "../api/kanbanBoard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import AppShell from "../components/AppShell";
import { useAppModalManager } from "../appModalManager";

export default function NoCreatedBoardsPage() {
  const [_, setLocation] = useLocation();
  const boardsQuery = useKanbanBoards();
  const { showModal } = useAppModalManager();

  useEffect(() => {
    if (boardsQuery.isSuccess && boardsQuery.data.at(0) !== undefined) {
      setLocation(`/board/${boardsQuery.data[0].id}`);
    }
  }, [boardsQuery.data]);

  function handleCreateNewBoardClicked() {
    showModal("createBoardModal");
  }

  return (
    <>
      <AppShell
        sideBar={
          <div className="mt-7">
            <KanbanBoardsNav boardId="" />
          </div>
        }
        main={
          <div className="flex items-center">
            <div className="mx-auto mt-96 text-center">
              <p className="text-lg font-medium text-slate-400 mb-5">
                No board has been created yet.
              </p>
              <Button
                onClick={handleCreateNewBoardClicked}
                variant="primary"
                size="large"
              >
                <div className="flex items-baseline">
                  <FontAwesomeIcon className="h-[0.6rem] mr-1" icon={faPlus} />
                  <span>Create New Board</span>
                </div>
              </Button>
            </div>
          </div>
        }
      />
    </>
  );
}
