import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Task } from "../../api/task";
import KanbanBoardTask from "./KanbanBoardTask";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Button from "../../components/Button";

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
    <div className="px-3 shrink-0 basis-96">
      <h3 className="uppercase font-semibold text-slate-400 tracking-widest mb-6">
        <div className="flex items-center">
          <span className="w-4 h-4 bg-amber-300 rounded-full mr-3"></span>
          <span>
            {columnName} ({ammountOfTask})
          </span>
        </div>
      </h3>

      <div className="flex flex-col gap-5">
        {tasks.map((taskData) => (
          <KanbanBoardTask key={taskData.title} taskData={taskData} />
        ))}
      </div>
    </div>
  );
}
