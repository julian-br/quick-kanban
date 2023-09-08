import { Menu, Transition } from "@headlessui/react";
import { Fragment, ReactNode } from "react";
import { MoreVerticalIcon } from "lucide-react";

interface ContextMenuProps {
  children: ReactNode[] | ReactNode;
}

function ContextMenu({ children }: ContextMenuProps) {
  return (
    <div>
      <Menu as="nav" className="relative">
        <Menu.Button className="rounded-full py-3 px-3 w-1 group">
          <MoreVerticalIcon className="h-[1.7rem] text-slate-500 group-hover:text-slate-400" />
        </Menu.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="z-50 absolute top-13 right-0 py-3 w-56 rounded-xl bg-slate-700 shadow-lg">
            {children}
          </Menu.Items>
        </Transition>
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
