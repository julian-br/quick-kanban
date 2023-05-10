import { Menu } from "@headlessui/react";
import { ReactNode } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";

interface ContextMenuProps {
  children: ReactNode[] | ReactNode;
}

function ContextMenu({ children }: ContextMenuProps) {
  return (
    <div>
      <Menu as="nav" className="relative">
        <Menu.Button className="rounded-full py-3 px-3 w-1 group">
          <FontAwesomeIcon
            icon={faEllipsisVertical}
            className="h-[1.7rem] text-slate-500 group-hover:text-slate-400"
          />
        </Menu.Button>
        <Menu.Items className="z-50 absolute right-0 py-3 w-56 rounded-xl bg-slate-700 shadow-lg">
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
        className=" w-full text-left py-2 px-3 hover:bg-slate-600 font-medium text-base text-slate-300 cursor-pointer"
      >
        {children}
      </div>
    </Menu.Item>
  );
}

ContextMenu.Entry = ContextMenuEntry;
export default ContextMenu;
