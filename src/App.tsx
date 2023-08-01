import KanbanBoardPage from "./pages/KanbanBoardPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Route } from "wouter";
import NoCreatedBoardsPage from "./pages/NoCreatedBoardsPage";

const queryClient = new QueryClient();

function App() {
  return (
    <div className="">
      <QueryClientProvider client={queryClient}>
        <Route path="/" component={NoCreatedBoardsPage}></Route>
        <Route path="/board/:boardId">
          {(params: { boardId: string }) => (
            <KanbanBoardPage urlParams={params} />
          )}
        </Route>
      </QueryClientProvider>
    </div>
  );
}

export default App;
