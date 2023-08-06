import { useKanbanBoard } from "../../api/kanbanBoard";
import KanbanBoardColumn from "./KanbanBoardColumn";
import Button from "../../components/Button";
import { useTaskMutation, useTasks } from "../../api/task";
import { useAppModalManager } from "../../appModalManager";
import { DragDropContext, DropResult } from "react-beautiful-dnd";

interface KanbanBoardProps {
  boardId: string;
}

export default function KanbanBoard({ boardId }: KanbanBoardProps) {
  const boardQuery = useKanbanBoard(boardId);
  const tasks = useTasks(boardId);
  const taskUpdateMutation = useTaskMutation().update;
  const { showModal } = useAppModalManager();

  function filterTasksByColumnIndex(columnIndex: number) {
    return tasks.data?.filter((task) => task.columnIndex === columnIndex) ?? [];
  }

  function handleCreateColumnClick() {
    showModal("editBoardModal", { boardId: boardId });
  }

  function handleTaskDragEnd({
    draggableId: draggedTaskId,
    destination,
  }: DropResult) {
    if (!destination) {
      return;
    }
    const rowIndex = destination.index;
    const columnIndex = boardQuery.data!.columns.indexOf(
      destination.droppableId
    );
    const taskToMutate = tasks.data?.find((task) => task.id === draggedTaskId);

    if (taskToMutate !== undefined) {
      taskUpdateMutation.mutate({ ...taskToMutate, columnIndex, rowIndex });
    }
  }

  return (
    <DragDropContext onDragEnd={handleTaskDragEnd}>
      {tasks.isSuccess && boardQuery.isSuccess && (
        <div className="h-full pt-7 flex px-4 select-none">
          {boardQuery.data.columns.map((columnName, columnIndex) => (
            <KanbanBoardColumn
              tasks={filterTasksByColumnIndex(columnIndex)}
              key={columnName}
              columnName={columnName}
            />
          ))}
          <CreateNewColumnButton onClick={handleCreateColumnClick} />
        </div>
      )}
    </DragDropContext>
  );
}

function CreateNewColumnButton({ onClick }: { onClick: () => void }) {
  return (
    <div className="basis-96 mt-2 px-4 shrink-0 h-[80vh]">
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
