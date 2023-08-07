import {
  KanbanBoardColumn as KanbanBoardColumnData,
  useKanbanBoard,
  useKanbanBoardMutation,
} from "../../api/kanbanBoard";
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
  const tasksQuery = useTasks(boardId);
  const boardUpdateMutation = useKanbanBoardMutation().update;
  const { showModal } = useAppModalManager();

  function handleCreateColumnClick() {
    showModal("editBoardModal", { boardId: boardId });
  }

  function handleTaskDragEnd({
    draggableId: draggedTaskId,
    destination,
    source,
  }: DropResult) {
    if (!destination || !source || !boardQuery.isSuccess) {
      return;
    }
    const columns = structuredClone(boardQuery.data.columns);

    columns.forEach((column) => {
      const isSourceColumn = column.title === source.droppableId;
      const isDestinationColumn = column.title === destination.droppableId;

      if (isSourceColumn) {
        column.taskIds.splice(source.index, 1);
      }

      if (isDestinationColumn) {
        column.taskIds.splice(destination.index, 0, draggedTaskId);
      }
    });

    boardUpdateMutation.mutate({ ...boardQuery.data, columns });
  }

  function getTasksForColumn(column: KanbanBoardColumnData) {
    const allTasks = tasksQuery.data;

    if (allTasks === undefined) {
      return [];
    }

    const tasksForColumn = column.taskIds.map((taskId) => {
      const correspondingTask = allTasks.find((task) => task.id === taskId);
      if (correspondingTask === undefined) {
        throw new Error("no Task with the id: " + taskId);
      }

      return correspondingTask;
    });

    return tasksForColumn;
  }

  return (
    <DragDropContext onDragEnd={handleTaskDragEnd}>
      {tasksQuery.isSuccess && boardQuery.isSuccess && (
        <div className="h-full pt-7 flex px-4 select-none">
          {boardQuery.data.columns.map((column) => (
            <KanbanBoardColumn
              columnTasks={getTasksForColumn(column)}
              key={column.title}
              column={column}
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
    <div className="basis-[26rem] mt-2 px-4 shrink-0 h-[80vh]">
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
