import { Draggable } from "react-beautiful-dnd";
import { useTaskQuery } from "../../api/task";
import { useAppModalManager } from "../../appModalManager";
import ContextMenu from "../../components/ContextMenu";
import { MouseEvent } from "react";

interface KanbanBoardTaskProps {
  taskId: number;
  rowIndex: number;
}

export default function KanbanBoardTask({
  taskId,
  rowIndex,
}: KanbanBoardTaskProps) {
  const taskQuery = useTaskQuery(taskId);
  const { showModal } = useAppModalManager();

  if (taskQuery === undefined) {
    return <></>;
  }

  function handleTaskClicked() {
    showModal("viewTaskModal", {
      taskId,
    });
  }
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

  const amountOfSubtasks = taskQuery.subtasks.length;
  const amountOfCompletedSubtasks = taskQuery.subtasks.filter(
    (subtaskData) => subtaskData.isCompleted
  ).length;

  return (
    <ContextMenu>
      <ContextMenu.Trigger>
        <Draggable draggableId={taskQuery.id.toString()} index={rowIndex}>
          {(providedDraggable) => (
            <div
              ref={providedDraggable.innerRef}
              {...providedDraggable.dragHandleProps}
              {...providedDraggable.draggableProps}
              className="bg-slate-900 w-full px-5 py-4 rounded-xl group hover:scale-[1.025] border-slate-700/70 border mb-4"
              onClick={handleTaskClicked}
            >
              <h4 className="text-lg font-bold text-slate-300 group-hover:text-primary-300">
                {taskQuery.title}
              </h4>
              <p className="text-slate-400 text-sm font-bold mb-2">
                {amountOfCompletedSubtasks} of {amountOfSubtasks} subtasks
              </p>

              <ContextMenu.Content>
                <ContextMenu.Item onClick={handleEditTaskClick}>
                  Edit Task
                </ContextMenu.Item>
                <ContextMenu.Item onClick={handleDeleteTaskClick}>
                  Delete Task
                </ContextMenu.Item>
              </ContextMenu.Content>
            </div>
          )}
        </Draggable>
      </ContextMenu.Trigger>
    </ContextMenu>
  );
}
