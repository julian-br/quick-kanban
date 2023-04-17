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
        <Menu.Button className="hover:bg-slate-800 px-3 rounded-full py-3">
          <FontAwesomeIcon
            icon={faEllipsisVertical}
            className="h-7 text-slate-500"
          />
        </Menu.Button>
        <Menu.Items className="absolute right-0 mt-1 py-4 w-56 rounded-xl bg-slate-700 shadow-lg">
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
        className=" w-full text-left py-2 px-3 hover:bg-slate-600 font-medium text-slate-300 cursor-pointer"
      >
        <div className="">{children}</div>
      </div>
    </Menu.Item>
  );
}

ContextMenu.Entry = ContextMenuEntry;
export default ContextMenu;
