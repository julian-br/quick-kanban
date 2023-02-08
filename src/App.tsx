import KanbanBoardPage from "./pages/KanbanBoardPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Route } from "wouter";
import NoCreatedBoardsPage from "./pages/NoCreatedBoardsPage";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

function App() {
  return (
    <div className="font-jakarta min-h-screen flex flex-col">
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
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
