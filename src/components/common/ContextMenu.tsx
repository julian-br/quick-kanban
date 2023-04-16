import Button from "./Button";
import VerticalEllipsisIcon from "../../assets/icon-vertical-ellipsis.svg";
import { Menu } from "@headlessui/react";
import { ReactNode } from "react";

interface ContextMenuProps {
  children: ReactNode[] | ReactNode;
}

function ContextMenu({ children }: ContextMenuProps) {
  return (
    <div>
      <Menu as="nav" className="relative">
        <Menu.Button className="hover:bg-slate-100 px-4 rounded-full py-4">
          <img
            src={VerticalEllipsisIcon}
            alt="Navbar Options"
            className="h-6 text-teal-200"
          />
        </Menu.Button>
        <Menu.Items className="absolute right-0 mt-1 py-4 w-56 rounded-xl bg-white shadow-lg border">
          {children}
        </Menu.Items>
      </Menu>
    </div>
  );
}

function ContextMenuEntry({
  onClick,
  children,
}: {
  onClick?: () => void;
  children: ReactNode;
}) {
  function handleEntryClicked() {
    if (onClick !== undefined) {
      onClick();
    }
  }

  return (
    <Menu.Item>
      <div
        onClick={handleEntryClicked}
        className=" w-full text-left py-2 px-3 hover:bg-slate-100 font-medium text-slate-600 cursor-pointer"
      >
        <div className="">{children}</div>
      </div>
    </Menu.Item>
  );
}

ContextMenu.Entry = ContextMenuEntry;
export default ContextMenu;
