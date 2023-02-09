import LogoIcon from "../assets/logo-dark.svg";
import PlusIcon from "../assets/icon-add-task.svg";
import VerticalEllipsisIcon from "../assets/icon-vertical-ellipsis.svg";
import Button from "./common/Button";

interface Props {
  onAddTaskClick?: () => void;
}

export default function Navbar({ onAddTaskClick }: Props) {
  function handleAddTaskClicked() {
    if (onAddTaskClick !== undefined) {
      onAddTaskClick();
    }
  }

  return (
    <nav className="bg-white px-7 py-5 border-b border-slate-200 flex items-center justify-between">
      <img src={LogoIcon} alt="Logo" />
      <div className="flex">
        <Button onClick={handleAddTaskClicked} variant="primary" size="large">
          <div className="flex items-baseline">
            <img src={PlusIcon} alt="Plus Icon" className="h-2 mr-1" />
            <span>Add New Task</span>
          </div>
        </Button>
        <Button
          variant="custom"
          className="hover:bg-secondary-light px-2 ml-3 rounded-full"
        >
          <img
            src={VerticalEllipsisIcon}
            alt="Navbar Options"
            className="h-5 text-primary"
          />
        </Button>
      </div>
    </nav>
  );
}
