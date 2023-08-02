import KanbanBoardPage from "./pages/KanbanBoardPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Route } from "wouter";
import NoCreatedBoardsPage from "./pages/NoCreatedBoardsPage";
import { ModalManager } from "./features/modal-manager/ModalManager";
import CreateBoardModal from "./features/managing-boards/CreateBoardModal";
import ViewTaskModal from "./features/managing-tasks/ViewTaskModal";

const queryClient = new QueryClient();

const modals = {
  createBoardModal: CreateBoardModal,
  viewTaskModal: ViewTaskModal,
};

function App() {
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <ModalManager modals={modals}>
          <Route path="/" component={NoCreatedBoardsPage}></Route>
          <Route path="/board/:boardId">
            {(params: { boardId: string }) => (
              <KanbanBoardPage urlParams={params} />
            )}
          </Route>
        </ModalManager>
      </QueryClientProvider>
    </div>
  );
}

export default App;
