import Button from "./components/common/Button";
import Listbox from "./components/common/Listbox";
import Navbar from "./components/Navbar";
import SideBar from "./components/SideBar";
import "./index.css";

function App() {
  return (
    <div className="font-jakarta">
      <Navbar />
      <SideBar>
        <div className="mx-3 bg-slate-50">
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
      </SideBar>
    </div>
  );
}

export default App;
