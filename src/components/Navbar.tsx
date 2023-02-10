import LogoIcon from "../assets/logo-dark.svg";
import { ReactNode } from "react";

interface NavbarProps {
  children?: ReactNode[] | ReactNode;
}

function Navbar({ children }: NavbarProps) {
  return (
    <nav className="bg-white px-7 border-b border-slate-200 flex items-center h-24">
      <img src={LogoIcon} alt="Logo" />
      {children}
    </nav>
  );
}

function NavbarControls({ children }: { children: ReactNode }) {
  return <div className="flex ml-auto gap-3">{children}</div>;
}

Navbar.Controls = NavbarControls;
export default Navbar;
