import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Task } from "../../api/task";
import KanbanBoardTask from "./KanbanBoardTask";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Button from "../../components/Button";

interface KanbanBoardColumnProps {
  columnName: string;
  tasks: Task[];
  onTaskClick: (taskData: Task) => void;
  onAddTaskClick: (columnName: string) => void;
}

export default function KanbanBoardColumn({
  columnName,
  tasks,
  onTaskClick,
  onAddTaskClick,
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
          <Button
            variant="custom"
            className="ml-auto rounded-lg hover:text-primary-400 hover:scale-125"
            onClick={() => onAddTaskClick(columnName)}
          >
            <FontAwesomeIcon icon={faPlus} className="h-4" />
          </Button>
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
