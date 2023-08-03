import { Task } from "../../api/task";
import { useAppModalManager } from "../../appModalManager";
import Button from "../../components/Button";

interface KanbanBoardTaskProps {
  taskData: Task;
}

export default function KanbanBoardTask({ taskData }: KanbanBoardTaskProps) {
  const amountOfSubtasks = taskData.subtasks.length;
  const amountOfCompletedSubtasks = taskData.subtasks.filter(
    (subtaskData) => subtaskData.isCompleted
  ).length;

  const { showModal } = useAppModalManager();

  return (
    <div>
      <Button
        variant="custom"
        onClick={() =>
          showModal("viewTaskModal", {
            boardId: taskData.boardId,
            task: taskData,
          })
        }
        className="bg-slate-800 w-full z-10 text-left pt-5 pb-7 px-5 rounded-xl group hover:scale-[1.025]"
      >
        <h4 className="text-lg font-bold text-slate-200 group-hover:text-primary-300">
          {taskData.title}
        </h4>
        <p className="text-slate-400 text-sm font-bold">
          {amountOfCompletedSubtasks} of {amountOfSubtasks} subtasks
        </p>
      </Button>
    </div>
  );
}
