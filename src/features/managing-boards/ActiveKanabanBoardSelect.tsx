import { Menu, Transition } from "@headlessui/react";
import {
  useKanbanBoardQuery,
  useKanbanBoardsQuery,
} from "../../api/kanbanBoard";
import { Fragment } from "react";
import { ChevronDownIcon } from "lucide-react";
import KanbanBoardsNav from "./KanbanBoardsNav";

interface ActiveKanabanBoardSelectProps {
  activeBoardId: number;
  className?: string;
}

export default function ActiveKanabanBoardSelect({
  activeBoardId,
  className,
}: ActiveKanabanBoardSelectProps) {
  const board = useKanbanBoardQuery(activeBoardId);
  const boards = useKanbanBoardsQuery();
  return (
    <>
      {board !== undefined && boards !== undefined && (
        <Menu as="nav" className={"relative" + className}>
          <Menu.Button className="flex items-center truncate text-white hover:text-slate-300">
            <div className="text-xl">{board.name}</div>
            <ChevronDownIcon className="h-5 ml-1 text-slate-400" />
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
            <Menu.Items className="z-50 absolute left-16 top-20 py-6 w-72 rounded-xl bg-slate-900 border border-slate-300/20 shadow-lg">
              <KanbanBoardsNav activeBoardId={activeBoardId} />
            </Menu.Items>
          </Transition>
        </Menu>
      )}
    </>
  );
}
