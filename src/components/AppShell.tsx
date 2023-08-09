import { CSSProperties, ReactNode, useState } from "react";
import Button from "./Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTable } from "@fortawesome/free-solid-svg-icons";

interface AppShellProps {
  main: ReactNode;
  sideBar?: ReactNode;
  navBar?: ReactNode;
}

const NAVBAR_HEIGHT = "5.5rem";
const SIDE_BAR_OPEN_WIDTH = "21rem";
const SIDE_BAR_CLOSED_WIDTH = "5rem";

export default function AppShell(props: AppShellProps) {
  const mainContentSize: CSSProperties = {
    height: `calc(100vh - ${NAVBAR_HEIGHT})`,
  };
  return (
    <div className="h-screen w-screen font-jakarta bg-gray-900">
      <Navbar>{props.navBar}</Navbar>
      <div className={`w-screen flex items-stretch`}>
        {props.sideBar && <SideBar>{props.sideBar} </SideBar>}
        <main className="overflow-hidden flex-grow" style={mainContentSize}>
          <div className="w-full h-full overflow-auto">{props.main}</div>
        </main>
      </div>
    </div>
  );
}

function Navbar({ children }: { children?: ReactNode }) {
  const navBarSize: CSSProperties = {
    width: "100vw",
    height: NAVBAR_HEIGHT,
  };

  return (
    <nav
      className="bg-slate-800 border-b bg-opacity-30 border-slate-700 border-opacity-40  px-7 flex  items-center"
      style={navBarSize}
    >
      <div className="text-3xl font-bold uppercase pr-24">
        <FontAwesomeIcon
          icon={faTable}
          className="text-primary-500 mr-3"
        ></FontAwesomeIcon>
        <span className="text-white">Kanban Board</span>
      </div>
      {children}
    </nav>
  );
}

function SideBar({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(true);

  const sideBarWidth = isOpen ? SIDE_BAR_OPEN_WIDTH : SIDE_BAR_CLOSED_WIDTH;

  const sideBarSize: CSSProperties = {
    width: sideBarWidth,
    height: `calc(100vh - ${NAVBAR_HEIGHT})`,
    flexGrow: 0,
    flexShrink: 0,
  };

  function toggleSideBar() {
    setIsOpen((prev) => !prev);
  }

  return (
    <nav
      className="bg-slate-800 border-r bg-opacity-20 border-slate-700 border-opacity-40 relative overflow-hidden transition-[width] ease-linear duration-75"
      style={sideBarSize}
    >
      <Button
        onClick={toggleSideBar}
        variant="custom"
        className={`${
          isOpen ? "right-2" : "mx-auto left-0 right-0"
        } w-fit top-3 p-2 absolute mx-auto font-bold text-xl text-slate-400 rounded-lg hover:bg-slate-800 hover:text-primary-400`}
      >
        <FontAwesomeIcon
          className="h-[1.65rem]"
          icon={faBars}
        ></FontAwesomeIcon>
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
