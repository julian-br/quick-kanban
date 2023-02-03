import LogoIcon from "../assets/logo-dark.svg";
import PlusIcon from "../assets/icon-add-task.svg";
import VerticalEllipsisIcon from "../assets/icon-vertical-ellipsis.svg";
import Button from "./common/Button";

export default function Navbar() {
  return (
    <div className="px-7 py-5 border-b border-slate-200 flex items-center justify-between">
      <img src={LogoIcon} alt="Logo" />
      <div className="flex">
        <Button variant="primary" size="large">
          <div className="flex items-baseline">
            <img src={PlusIcon} alt="Plus Icon" className="h-2 mr-1" />
            <span>Add New Task</span>
          </div>
        </Button>
        <button className="hover:bg-secondary-light px-2 ml-3 rounded-full">
          <img
            src={VerticalEllipsisIcon}
            alt="Navbar Options"
            className="h-6 text-primary"
          />
        </button>
      </div>
    </div>
  );
}
