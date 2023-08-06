import { Draggable, Droppable } from "react-beautiful-dnd";
import { Task } from "../../api/task";
import KanbanBoardTask from "./KanbanBoardTask";
interface KanbanBoardColumnProps {
  columnName: string;
  tasks: Task[];
}

export default function KanbanBoardColumn({
  columnName,
  tasks,
}: KanbanBoardColumnProps) {
  const ammountOfTask = tasks.length;

  const tasksSortedByRowIndex = [...tasks].sort(
    (taskA, taskB) => taskA.rowIndex - taskB.rowIndex
  );

  return (
    <div className="px-3 shrink-0 basis-96">
      <h3 className="uppercase font-semibold text-slate-400 tracking-widest mb-6">
        <div className="flex items-center">
          <span className="w-4 h-4 bg-amber-300 rounded-full mr-3"></span>
          <span>
            {columnName} ({ammountOfTask})
          </span>
        </div>
      </h3>
      <Droppable droppableId={columnName}>
        {(providedDroppable) => (
          <div
            ref={providedDroppable.innerRef}
            className="flex flex-col gap-5"
            {...providedDroppable.droppableProps}
          >
            {tasksSortedByRowIndex.map((taskData) => (
              <Draggable
                key={taskData.id}
                draggableId={taskData.id}
                index={taskData.rowIndex}
              >
                {(providedDraggable) => (
                  <div
                    ref={providedDraggable.innerRef}
                    {...providedDraggable.dragHandleProps}
                    {...providedDraggable.draggableProps}
                  >
                    <KanbanBoardTask taskData={taskData} />
                  </div>
                )}
              </Draggable>
            ))}
            {providedDroppable.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}
