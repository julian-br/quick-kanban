import ActiveBoardsDisplay from "./components/ActiveBoardsDisplay";
import Button from "./components/common/Button";
import Listbox from "./components/common/Listbox";
import Navbar from "./components/Navbar";
import SideBar from "./components/SideBar";
import "./index.css";

function App() {
  return (
    <div className="font-jakarta min-h-screen">
      <Navbar />
      <div className="flex">
        <SideBar>
          <div className="mt-11">
            <h2 className="uppercase font-semibold text-slate-400 tracking-widest ml-7 mb-6">
              all boards (3)
            </h2>
            <ActiveBoardsDisplay
              boardHeaders={[
                { id: "0", name: "Marketing", isActive: true },
                { id: "1", name: "Development", isActive: false },
              ]}
            />
          </div>
        </SideBar>
        <div className="bg-slate-50 h-[90vh] w-full pl-7">
          <h1 className="font-bold text-3xl pt-8">Kanban Board</h1>
          <Button variant="primary" size="large">
            Test
          </Button>
          <Button variant="primary">Test</Button>
          <Button variant="secondary">Test</Button>
          <Button variant="danger">Test</Button>

          <div className="mt-3">
            <Listbox options={["test 2", "test 3"]}></Listbox>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
