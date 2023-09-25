import {
  useKanbanBoardQuery,
  useKanbanBoardMutation,
} from "../../api/kanbanBoard";
import KanbanBoardColumn from "./KanbanBoardColumn";
import Button from "../../components/Button";
import { useAppModalManager } from "../../appModalManager";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { FileXIcon } from "lucide-react";
import { Link } from "wouter";

interface KanbanBoardProps {
  boardId: number;
}

export default function KanbanBoard({ boardId }: KanbanBoardProps) {
  const boardQuery = useKanbanBoardQuery(boardId);
  const boardMutation = useKanbanBoardMutation();
  const { showModal } = useAppModalManager();

  function handleCreateColumnClick() {
    showModal("editBoardModal", { boardId });
  }

  function handleTaskDragEnd({
    draggableId: draggedTaskId,
    destination,
    source,
  }: DropResult) {
    if (!destination || !source || boardQuery === undefined) {
      return;
    }
    const columns = structuredClone(boardQuery.columns);

    columns.forEach((column) => {
      const isSourceColumn = column.title === source.droppableId;
      const isDestinationColumn = column.title === destination.droppableId;

      if (isSourceColumn) {
        column.taskIds.splice(source.index, 1);
      }

      if (isDestinationColumn) {
        column.taskIds.splice(destination.index, 0, parseInt(draggedTaskId));
      }
    });

    boardMutation.put({ ...boardQuery, columns });
  }

  return (
    <DragDropContext onDragEnd={handleTaskDragEnd}>
      {boardQuery !== undefined && (
        <div className="pt-7 flex px-4 select-none">
          {boardQuery.columns.map((column) => (
            <KanbanBoardColumn key={column.title} column={column} />
          ))}
          <CreateNewColumnButton onClick={handleCreateColumnClick} />
        </div>
      )}
    </DragDropContext>
  );
}

function CreateNewColumnButton({ onClick }: { onClick: () => void }) {
  return (
    <div className="basis-[26rem] hidden md:block mt-2 px-4 shrink-0 h-[80vh]">
      <Button
        variant="custom"
        onClick={onClick}
        className="w-full h-full bg-slate-700 rounded-xl bg-opacity-20 text-slate-400 mt-11 hover:text-primary-300"
      >
        <span className="font-bold text-2xl mr-1">+</span>
        <span className="text-2xl font-bold ">New Column</span>
      </Button>
    </div>
  );
}

function ErrorMessage() {
  return (
    <div className="h-[50%]  flex items-center justify-center">
      <div className="flex flex-col items-center gap-5">
        <FileXIcon size={"2.6rem"} className="text-danger-400" />
        <div className="text-lg text-slate-400">
          Board does not exist or could not be loaded.
        </div>
        <Link
          className="text-lg text-slate-300 underline hover:text-primary-400"
          href="/"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
}
