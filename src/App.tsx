import KanbanBoardPage from "./pages/KanbanBoardPage";
import { Route } from "wouter";
import NoCreatedBoardsPage from "./pages/NoCreatedBoardsPage";
import { AppModalManagerProvider } from "./appModalManager";
import "@fontsource-variable/nunito";

function App() {
  return (
    <AppModalManagerProvider>
      <Route path="/" component={NoCreatedBoardsPage}></Route>
      <Route path="/board/:boardId">
        {(params: { boardId: string }) => (
          <KanbanBoardPage urlParams={params} />
        )}
      </Route>
    </AppModalManagerProvider>
  );
}

export default App;
