import {
  useKanbanBoardQuery,
  useKanbanBoardMutation,
} from "../../api/kanbanBoard";
import KanbanBoardColumn from "./KanbanBoardColumn";
import Button from "../../components/Button";
import { useAppModalManager } from "../../appModalManager";
import { DragDropContext, DropResult } from "react-beautiful-dnd";

interface KanbanBoardProps {
  boardId: number;
}

export default function KanbanBoard({ boardId }: KanbanBoardProps) {
  const board = useKanbanBoardQuery(boardId);
  const boardMutation = useKanbanBoardMutation();
  const { showModal } = useAppModalManager();

  function handleCreateColumnClick() {
    if (board !== undefined) {
      showModal("editBoardModal", { boardId });
    }
  }

  function handleTaskDragEnd({
    draggableId: draggedTaskId,
    destination,
    source,
  }: DropResult) {
    if (!destination || !source || board === undefined) {
      return;
    }
    const columns = structuredClone(board.columns);

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

    boardMutation.put({ ...board, columns });
  }

  return (
    <DragDropContext onDragEnd={handleTaskDragEnd}>
      {board !== undefined && (
        <div className="pt-7 flex px-4 select-none">
          {board.columns.map((column) => (
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
