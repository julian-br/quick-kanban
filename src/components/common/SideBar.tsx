import { ReactNode, useState } from "react";
import Button from "./Button";

interface Props {
  children: ReactNode;
}

export default function SideBar({ children }: Props) {
  const [isOpen, setIsOpen] = useState(true);

  function toggleIsOpen() {
    setIsOpen(!isOpen);
  }

  return (
    <nav className="bg-white border-r relative border-slate-200">
      <div className="absolute flex w-full pt-5">
        <Button
          onClick={toggleIsOpen}
          variant="custom"
          className="rotate-90 p-2 ml-auto mr-3 font-bold text-xl text-slate-400 rounded-lg hover:bg-primary-50 hover:text-primary-400"
        >
          {"|||"}
        </Button>
      </div>
      <div className={isOpen ? "w-80" : "w-16"}>{isOpen && children}</div>
    </nav>
  );
}
