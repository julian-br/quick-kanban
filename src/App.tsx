import Button from "./components/common/Button";
import Dropdown from "./components/common/Dropdown";
import "./index.css";

function App() {
  return (
    <div className="font-jakarta">
      <h1 className="font-bold text-3xl">Kanban Board</h1>
      <Button variant="primary" size="large">
        Test
      </Button>
      <Button variant="primary">Test</Button>
      <Button variant="secondary">Test</Button>
      <Button variant="danger">Test</Button>
      <Dropdown options={["test2, test3"]}></Dropdown>
    </div>
  );
}

export default App;
