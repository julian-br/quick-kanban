import { Draggable } from "react-beautiful-dnd";
import { useTaskQuery } from "../../api/task";
import { useAppModalManager } from "../../appModalManager";

interface KanbanBoardTaskProps {
  taskId: string;
  rowIndex: number;
}

export default function KanbanBoardTask({
  taskId,
  rowIndex,
}: KanbanBoardTaskProps) {
  const taskQuery = useTaskQuery(taskId);
  const { showModal } = useAppModalManager();

  if (!taskQuery.isSuccess) {
    return <></>;
  }

  function handleTaskClicked() {
    showModal("viewTaskModal", {
      taskId: taskQuery.data!.id,
    });
  }

  const amountOfSubtasks = taskQuery.data.subtasks.length;
  const amountOfCompletedSubtasks = taskQuery.data.subtasks.filter(
    (subtaskData) => subtaskData.isCompleted
  ).length;

  return (
    <Draggable draggableId={taskQuery.data.id} index={rowIndex}>
      {(providedDraggable, { isDragging }) => (
        <div
          ref={providedDraggable.innerRef}
          {...providedDraggable.dragHandleProps}
          {...providedDraggable.draggableProps}
          className={`${
            isDragging ? "shadow-lg " : ""
          } bg-slate-800 w-full z-10 px-5 py-4 rounded-xl group hover:scale-[1.025] border-slate-600 border border-opacity-40 mb-4`}
          onClick={handleTaskClicked}
        >
          <h4 className="text-lg font-bold text-slate-200 group-hover:text-primary-300">
            {taskQuery.data.title}
          </h4>
          <p className="text-slate-400 text-sm font-bold mb-2">
            {amountOfCompletedSubtasks} of {amountOfSubtasks} subtasks
          </p>
        </div>
      )}
    </Draggable>
  );
}
