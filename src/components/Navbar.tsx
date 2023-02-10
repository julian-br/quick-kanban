import LogoIcon from "../assets/logo-dark.svg";
import { ReactNode } from "react";

interface Props {
  onAddTaskClick?: () => void;
  children?: ReactNode[] | ReactNode;
}

function Navbar({ onAddTaskClick, children }: Props) {
  function handleAddTaskClicked() {
    if (onAddTaskClick !== undefined) {
      onAddTaskClick();
    }
  }

  return (
    <nav className="bg-white px-7 border-b border-slate-200 flex items-center h-24">
      <img src={LogoIcon} alt="Logo" />
      {children}
    </nav>
  );
}

function NavbarControls({ children }: { children: ReactNode }) {
  return <div className="flex ml-auto">{children}</div>;
}

Navbar.Controls = NavbarControls;
export default Navbar;
