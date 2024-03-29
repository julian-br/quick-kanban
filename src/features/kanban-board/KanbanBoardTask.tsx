import { Draggable } from "react-beautiful-dnd";
import { useTaskQuery } from "../../api/task";
import { useAppModalManager } from "../../appModalManager";
import ContextMenu from "../../components/ContextMenu";
import { MouseEvent, ReactNode } from "react";

interface KanbanBoardTaskProps {
  taskId: number;
  rowIndex: number;
}

export default function KanbanBoardTask({
  taskId,
  rowIndex,
}: KanbanBoardTaskProps) {
  const task = useTaskQuery(taskId);
  const { showModal } = useAppModalManager();

  function handleTaskClicked() {
    showModal("viewTaskModal", {
      taskId,
    });
  }

  const amountOfSubtasks = task?.subtasks.length;
  const amountOfCompletedSubtasks = task?.subtasks.filter(
    (subtaskData) => subtaskData.isCompleted
  ).length;

  return (
    <TaskContextMenuWrapper taskId={taskId}>
      {task !== undefined && (
        <Draggable draggableId={task.id.toString()} index={rowIndex}>
          {(providedDraggable) => (
            <div
              ref={providedDraggable.innerRef}
              {...providedDraggable.dragHandleProps}
              {...providedDraggable.draggableProps}
              className="bg-slate-900 w-full px-5 py-4 rounded-xl group hover:scale-[1.025] border-slate-700/70 border mb-4"
              onClick={handleTaskClicked}
            >
              <h4 className="text-lg font-bold text-slate-300 group-hover:text-primary-300">
                {task.title}
              </h4>
              <p className="text-slate-400 text-sm font-bold mb-2">
                {amountOfCompletedSubtasks} of {amountOfSubtasks} subtasks
              </p>
            </div>
          )}
        </Draggable>
      )}
    </TaskContextMenuWrapper>
  );
}

function TaskContextMenuWrapper({
  children,
  taskId,
}: {
  children: ReactNode;
  taskId: number;
}) {
  const { showModal } = useAppModalManager();

  function handleEditTaskClick(e: MouseEvent) {
    e.stopPropagation();
    showModal("editTaskModal", {
      taskId,
    });
  }

  function handleDeleteTaskClick(e: MouseEvent) {
    e.stopPropagation();
    showModal("deleteTaskModal", {
      taskId,
    });
  }

  return (
    <ContextMenu>
      <ContextMenu.Trigger>
        {children}
        <ContextMenu.Content>
          <ContextMenu.Item onClick={handleEditTaskClick}>
            Edit Task
          </ContextMenu.Item>
          <ContextMenu.Item onClick={handleDeleteTaskClick}>
            Delete Task
          </ContextMenu.Item>
        </ContextMenu.Content>
      </ContextMenu.Trigger>
    </ContextMenu>
  );
}
