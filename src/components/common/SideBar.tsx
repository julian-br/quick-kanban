import { ReactNode, useState } from "react";
import Button from "./Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

interface Props {
  children: ReactNode;
}

export default function SideBar({ children }: Props) {
  const [isOpen, setIsOpen] = useState(true);

  function toggleIsOpen() {
    setIsOpen(!isOpen);
  }

  return (
    <nav className="bg-slate-800 bg-opacity-40  relative ">
      <div className="absolute flex w-full pt-5">
        <Button
          onClick={toggleIsOpen}
          variant="custom"
          className="p-2 ml-auto mr-3 font-bold text-xl text-slate-400 rounded-lg hover:bg-slate-800 hover:text-primary-400"
        >
          <FontAwesomeIcon className="h-6" icon={faBars}></FontAwesomeIcon>
        </Button>
      </div>
      <div className={isOpen ? "w-96" : "w-16"}>{isOpen && children}</div>
    </nav>
  );
}
