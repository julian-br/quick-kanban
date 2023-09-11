import { Menu, Transition } from "@headlessui/react";
import { Fragment, ReactNode } from "react";
import { MoreVerticalIcon } from "lucide-react";

interface SettingsMenuProps {
  children: ReactNode[] | ReactNode;
}

function SettingsMenu({ children }: SettingsMenuProps) {
  return (
    <Menu as="nav" className="relative rounded-full">
      <Menu.Button className="rounded-full group flex">
        <MoreVerticalIcon className="h-10 text-slate-500 group-hover:text-slate-400" />
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
        <Menu.Items className="z-50 absolute right-0 py-3 w-56 border border-slate-800 rounded-xl bg-slate-900 shadow-lg">
          {children}
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

function SettingsMenuEntry({
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
      {({ active }) => (
        <div
          onClick={handleEntryClicked}
          className={`${
            active ? "bg-slate-800" : ""
          } flex items-center w-full text-left py-2 px-3 font-medium text-base text-slate-400 cursor-pointer`}
        >
          {children}
        </div>
      )}
    </Menu.Item>
  );
}

SettingsMenu.Entry = SettingsMenuEntry;
export default SettingsMenu;
