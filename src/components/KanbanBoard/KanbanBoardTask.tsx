import { Task } from "../../api/task";
import Button from "../common/Button";

interface Props {
  taskData: Task;
  onTaskClick: (taskData: Task) => void;
}

export default function KanbanBoardTask({ taskData, onTaskClick }: Props) {
  const amountOfSubtasks = taskData.subtasks.length;
  const amountOfCompletedSubtasks = taskData.subtasks.filter(
    (subtaskData) => subtaskData.isCompleted
  ).length;

  return (
    <div>
      <Button
        variant="custom"
        onClick={() => onTaskClick(taskData)}
        className="bg-white w-full text-left pt-5 pb-7 px-5 rounded-xl shadow-md group"
      >
        <h4 className="text-lg font-bold text-slate-700 group-hover:text-primary-500">
          {taskData.title}
        </h4>
        <p className="text-slate-400 text-sm font-bold">
          {amountOfCompletedSubtasks} of {amountOfSubtasks} subtasks
        </p>
      </Button>
    </div>
  );
}
