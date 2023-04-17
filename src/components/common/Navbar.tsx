import { ReactNode } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTable } from "@fortawesome/free-solid-svg-icons";

interface NavbarProps {
  children?: ReactNode[] | ReactNode;
}

function Navbar({ children }: NavbarProps) {
  return (
    <nav className="bg-slate-800 border-b bg-opacity-40 border-slate-700 border-opacity-40  px-7 flex items-center py-3">
      <Brand />
      {children}
    </nav>
  );
}

function Brand() {
  return (
    <div className="text-3xl font-bold uppercase">
      <FontAwesomeIcon
        icon={faTable}
        className="text-primary-500 mr-3"
      ></FontAwesomeIcon>
      <span className="text-white">Kanban Board</span>
    </div>
  );
}

function NavbarControls({ children }: { children: ReactNode }) {
  return <div className="flex ml-auto items-center gap-3">{children}</div>;
}

Navbar.Controls = NavbarControls;
export default Navbar;
