import { KanbanBoardColumnData, KanbanTaskData } from "../../api/kanbanBoard";
import KanbanBoardTask from "./KanbanBoardTask";

interface Props {
  columnData: KanbanBoardColumnData;
  onTaskClick: (taskData: KanbanTaskData) => void;
}

export default function KanbanBoardColumn({ columnData, onTaskClick }: Props) {
  const ammountOfTask = columnData.tasks.length;
  const tasksData = columnData.tasks;

  return (
    <div className="px-3 h-full w-96">
      <h3 className="uppercase font-semibold text-slate-400 tracking-widest mb-6">
        <div className="flex items-center">
          <div className="w-4 h-4 bg-amber-300 rounded-full mr-3"></div>
          {columnData.name} ({ammountOfTask})
        </div>
      </h3>

      <div className="flex flex-col gap-5">
        {tasksData.map((taskData) => (
          <KanbanBoardTask
            key={taskData.title}
            onTaskClick={onTaskClick}
            taskData={taskData}
          />
        ))}
      </div>
    </div>
  );
}
