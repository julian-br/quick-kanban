import KanbanBoardPage from "./pages/KanbanBoardPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Route } from "wouter";
import NoCreatedBoardsPage from "./pages/NoCreatedBoardsPage";
import { AppModalManagerProvider } from "./appModalManager";
import "@fontsource-variable/nunito";

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false } },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppModalManagerProvider>
        <Route path="/" component={NoCreatedBoardsPage}></Route>
        <Route path="/board/:boardId">
          {(params: { boardId: string }) => (
            <KanbanBoardPage urlParams={params} />
          )}
        </Route>
      </AppModalManagerProvider>
    </QueryClientProvider>
  );
}

export default App;
