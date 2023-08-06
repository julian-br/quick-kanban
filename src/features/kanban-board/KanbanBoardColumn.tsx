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

  return (
    <div className="px-2 shrink-0 basis-[25rem] grow-0">
      <h3 className="uppercase font-semibold text-slate-400 tracking-widest mb-6">
        <div className="flex items-center">
          <span className="w-4 h-4 bg-amber-300 rounded-full mr-3"></span>
          <span>
            {columnName} ({ammountOfTask})
          </span>
        </div>
      </h3>
      <TaskList columnName={columnName} tasks={tasks} />
    </div>
  );
}

function TaskList({
  columnName,
  tasks,
}: {
  columnName: string;
  tasks: Task[];
}) {
  const tasksSortedByRowIndex = [...tasks].sort(
    (taskA, taskB) => taskA.rowIndex - taskB.rowIndex
  );

  return (
    <Droppable droppableId={columnName}>
      {(providedDroppable) => (
        <div
          ref={providedDroppable.innerRef}
          className="flex flex-col h-full"
          {...providedDroppable.droppableProps}
        >
          {tasksSortedByRowIndex.map((taskData) => (
            <KanbanBoardTask key={taskData.id} taskData={taskData} />
          ))}
          <div className="w-0">{providedDroppable.placeholder}</div>
        </div>
      )}
    </Droppable>
  );
}
