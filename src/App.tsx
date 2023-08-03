import KanbanBoardPage from "./pages/KanbanBoardPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Route } from "wouter";
import NoCreatedBoardsPage from "./pages/NoCreatedBoardsPage";
import {
  ModalManager,
  createModalManager,
} from "./features/modal-manager/ModalManager";
import CreateBoardModal from "./features/managing-boards/CreateBoardModal";
import ViewTaskModal from "./features/managing-tasks/ViewTaskModal";

const queryClient = new QueryClient();

const modals = {
  createBoardModal: CreateBoardModal,
  viewTaskModal: ViewTaskModal,
};

const { provider: Test, useModalManager } = createModalManager(modals);

export const testModalManager = useModalManager;

function App() {
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <Test>
          <Route path="/" component={NoCreatedBoardsPage}></Route>
          <Route path="/board/:boardId">
            {(params: { boardId: string }) => (
              <KanbanBoardPage urlParams={params} />
            )}
          </Route>
        </Test>
      </QueryClientProvider>
    </div>
  );
}

export default App;
