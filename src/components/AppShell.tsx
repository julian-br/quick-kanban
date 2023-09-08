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
    <div className="h-screen w-screen flex flex-col font-nunito bg-gray-900">
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
    <nav className="bg-slate-800 w-full h-24 border-b bg-opacity-30 border-slate-700 border-opacity-40  px-7 flex  items-center">
      <div className="flex items-center gap-4">
        <LayoutDashboardIcon className="text-primary-500" />
        <span className="text-white text-2xl font-bold uppercase">
          Kanban Board
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
        isOpen ? "w-[22rem]" : "w-16"
      } bg-slate-800 border-r flex-shrink-0  bg-opacity-20 border-slate-700 border-opacity-40 relative overflow-hidden transition-[width] ease-linear duration-75`}
    >
      <Button
        onClick={toggleSideBar}
        variant="custom"
        className={`${
          isOpen ? "right-2" : "mx-auto left-0 right-0"
        } w-fit top-3 p-2 absolute mx-auto font-bold text-xl text-slate-400 rounded-lg hover:bg-slate-800 hover:text-primary-400`}
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
