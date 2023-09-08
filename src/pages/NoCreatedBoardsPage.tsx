import { useEffect } from "react";
import Button from "../components/Button";
import KanbanBoardsNav from "../features/managing-boards/KanbanBoardsNav";
import { useLocation } from "wouter";
import { useKanbanBoardsQuery } from "../api/kanbanBoard";
import AppShell from "../components/AppShell";
import { useAppModalManager } from "../appModalManager";
import { PlusIcon } from "lucide-react";

export default function NoCreatedBoardsPage() {
  const [_, setLocation] = useLocation();
  const boardsQuery = useKanbanBoardsQuery();
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
        sideBarContent={
          <div className="mt-7">
            <KanbanBoardsNav boardId="" />
          </div>
        }
        mainContent={
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
                  <PlusIcon className="h-[0.6rem] mr-1" />
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
