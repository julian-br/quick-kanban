import { useEffect } from "react";
import Button from "../components/Button";
import KanbanBoardsNav from "../features/managing-boards/KanbanBoardsNav";
import { useLocation } from "wouter";
import {
  createExampleBoardWithTasks,
  useKanbanBoardsQuery,
} from "../api/kanbanBoard";
import AppShell from "../components/AppShell";
import { useAppModalManager } from "../appModalManager";
import useUserInfo from "../lib/useUserInfo";

export default function NoCreatedBoardsPage() {
  const [_, setLocation] = useLocation();
  const boardsQuery = useKanbanBoardsQuery();
  const { showModal } = useAppModalManager();
  const userInfo = useUserInfo();

  if (userInfo.isFirstTimeVisitor) {
    createExampleBoardWithTasks().then(() =>
      console.log("populated db with example data")
    );
  }
  useEffect(() => {
    if (boardsQuery?.at(0) !== undefined) {
      setLocation(`/board/${boardsQuery[0].id}`);
    }
  }, [boardsQuery]);

  function handleCreateNewBoardClicked() {
    showModal("createBoardModal");
  }

  return (
    <>
      <AppShell
        sideBarContent={
          <div className="mt-7">
            <KanbanBoardsNav />
          </div>
        }
        mainContent={
          <div className="flex justify-center h-[70%] items-center">
            <div className="text-center">
              <p className="text-lg font-medium text-slate-400 mb-5">
                No board has been created yet.
              </p>
              <Button
                onClick={handleCreateNewBoardClicked}
                variant="primary"
                size="large"
              >
                <div className="flex items-baseline">
                  <span>+ Create New Board</span>
                </div>
              </Button>
            </div>
          </div>
        }
      />
    </>
  );
}
