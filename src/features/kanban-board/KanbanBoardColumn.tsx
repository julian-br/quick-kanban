import { Droppable } from "react-beautiful-dnd";
import { Task } from "../../api/task";
import KanbanBoardTask from "./KanbanBoardTask";
import { KanbanBoardColumn as KanbanBoardColumnData } from "../../api/kanbanBoard";
interface KanbanBoardColumnProps {
  column: KanbanBoardColumnData;
  columnTasks: Task[];
}

export default function KanbanBoardColumn({
  column,
  columnTasks,
}: KanbanBoardColumnProps) {
  const ammountOfTask = column.taskIds.length;

  return (
    <div className="px-2 shrink-0 basis-[25rem] grow-0">
      <h3 className="uppercase font-semibold text-slate-400 tracking-widest mb-6">
        <div className="flex items-center">
          <span className="w-4 h-4 bg-amber-300 rounded-full mr-3"></span>
          <span>
            {column.title} ({ammountOfTask})
          </span>
        </div>
      </h3>
      <TaskList columnName={column.title} tasks={columnTasks} />
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
  return (
    <Droppable droppableId={columnName}>
      {(providedDroppable) => (
        <div
          ref={providedDroppable.innerRef}
          className="flex flex-col h-full"
          {...providedDroppable.droppableProps}
        >
          {tasks.map((taskData, rowIndex) => (
            <KanbanBoardTask
              rowIndex={rowIndex}
              key={taskData.id}
              taskData={taskData}
            />
          ))}
          <div className="w-0">{providedDroppable.placeholder}</div>
        </div>
      )}
    </Droppable>
  );
}
