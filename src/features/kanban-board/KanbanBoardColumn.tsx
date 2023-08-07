import { Droppable } from "react-beautiful-dnd";
import KanbanBoardTask from "./KanbanBoardTask";
import { KanbanBoardColumn as KanbanBoardColumnData } from "../../api/types";

interface KanbanBoardColumnProps {
  column: KanbanBoardColumnData;
}

export default function KanbanBoardColumn({ column }: KanbanBoardColumnProps) {
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
      <Droppable droppableId={column.title}>
        {(providedDroppable) => (
          <div
            ref={providedDroppable.innerRef}
            className="flex flex-col h-full"
            {...providedDroppable.droppableProps}
          >
            {column.taskIds.map((taskId, rowIndex) => (
              <KanbanBoardTask
                rowIndex={rowIndex}
                key={taskId}
                taskId={taskId}
              />
            ))}
            <div className="w-0">{providedDroppable.placeholder}</div>
          </div>
        )}
      </Droppable>
    </div>
  );
}
