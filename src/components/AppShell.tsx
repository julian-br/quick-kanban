import { ReactNode, useState } from "react";
import Button from "./Button";
import { LayoutDashboardIcon, MenuIcon } from "lucide-react";

interface AppShellProps {
  mainContent: ReactNode;
  sideBarContent?: ReactNode;
  navBarContent?: ReactNode;
}

export default function AppShell(props: AppShellProps) {
  return (
    <div className="h-screen w-screen flex flex-col font-nunito bg-slate-950">
      <Navbar>{props.navBarContent}</Navbar>
      <div className="w-full flex items-stretch flex-grow h-0">
        {props.sideBarContent && <SideBar>{props.sideBarContent} </SideBar>}
        <main className="overflow-hidden flex-grow">
          <div className="w-full h-full overflow-auto">{props.mainContent}</div>
        </main>
      </div>
    </div>
  );
}

function Navbar({ children }: { children?: ReactNode }) {
  return (
    <nav className="bg-slate-900/30 w-full h-24 border-b border-slate-800 pl-7 pr-2 md:pr-7 flex  items-center">
      <div className="flex items-center gap-4">
        <LayoutDashboardIcon className="text-primary-500" />
        <span className="text-white text-2xl font-bold uppercase hidden md:block">
          Kanban
        </span>
      </div>
      {children}
    </nav>
  );
}

function SideBar({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(true);

  function toggleSideBar() {
    setIsOpen((prev) => !prev);
  }

  return (
    <nav
      className={`${
        isOpen ? "w-[23rem]" : "w-16"
      } hidden md:block bg-slate-900/30 border-r flex-shrink-0  border-slate-800 relative overflow-hidden transition-[width] ease-linear duration-75`}
    >
      <Button
        onClick={toggleSideBar}
        variant="custom"
        className={`${
          isOpen ? "right-2" : "mx-auto left-0 right-0"
        } w-fit top-3 p-2 absolute mx-auto font-bold text-xl text-slate-400 rounded-lg  hover:text-slate-200`}
      >
        <MenuIcon />
      </Button>
      <div
        className={`${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        } pt-7 whitespace-nowrap transition-opacity ease-linear duration-75`}
      >
        {children}
      </div>
    </nav>
  );
}
