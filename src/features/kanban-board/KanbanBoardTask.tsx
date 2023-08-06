import { Draggable, DraggableProvided } from "react-beautiful-dnd";
import { Task } from "../../api/task";
import { useAppModalManager } from "../../appModalManager";

interface KanbanBoardTaskProps {
  taskData: Task;
}

export default function KanbanBoardTask({ taskData }: KanbanBoardTaskProps) {
  const amountOfSubtasks = taskData.subtasks.length;
  const amountOfCompletedSubtasks = taskData.subtasks.filter(
    (subtaskData) => subtaskData.isCompleted
  ).length;

  const { showModal } = useAppModalManager();

  function handleTaskClicked() {
    showModal("viewTaskModal", {
      taskId: taskData.id,
    });
  }

  return (
    <Draggable draggableId={taskData.id} index={taskData.rowIndex}>
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
            {taskData.title}
          </h4>
          <p className="text-slate-400 text-sm font-bold mb-2">
            {amountOfCompletedSubtasks} of {amountOfSubtasks} subtasks
          </p>
        </div>
      )}
    </Draggable>
  );
}
