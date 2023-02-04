import { KanbanTaskData } from "../../types/kanbanBoard";

interface Props {
  taskData: KanbanTaskData;
  onTaskClick: (taskData: KanbanTaskData) => void;
}

export default function KanbanBoardTask({ taskData, onTaskClick }: Props) {
  const amountOfSubtasks = taskData.subtasks.length;
  const amountOfCompletedSubtasks = taskData.subtasks.filter(
    (subtaskData) => subtaskData.isCompleted
  ).length;

  return (
    <div>
      <button
        onClick={() => onTaskClick(taskData)}
        className="bg-white w-full text-left pt-5 pb-7 px-5 rounded-xl shadow-md shadow-secondary-light group"
      >
        <h4 className="text-lg font-bold text-slate-700 group-hover:text-primary">
          {taskData.title}
        </h4>
        <p className="text-slate-400 text-sm font-bold">
          {amountOfCompletedSubtasks} of {amountOfSubtasks} subtasks
        </p>
      </button>
    </div>
  );
}
