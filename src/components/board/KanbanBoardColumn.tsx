import { Task } from "../../api/task";
import KanbanBoardTask from "./KanbanBoardTask";

interface Props {
  columnName: string;
  tasks: Task[];
  onTaskClick: (taskData: Task) => void;
}

export default function KanbanBoardColumn({
  columnName,
  tasks,
  onTaskClick,
}: Props) {
  const ammountOfTask = tasks.length;

  return (
    <div className="px-3 w-96">
      <h3 className="uppercase font-semibold text-slate-400 tracking-widest mb-6">
        <div className="flex items-center">
          <div className="w-4 h-4 bg-amber-300 rounded-full mr-3"></div>
          {columnName} ({ammountOfTask})
        </div>
      </h3>

      <div className="flex flex-col gap-5">
        {tasks.map((taskData) => (
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
