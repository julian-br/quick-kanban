import Button from "../../components/Button";
import { Subtask } from "../../api/types";
import { CheckIcon } from "lucide-react";
interface Props {
  subtasks: Subtask[];
  onSubtaskClick: (subtask: Subtask) => void;
}

export default function SubtaskList({ subtasks, onSubtaskClick }: Props) {
  const amountOfSubtasks = subtasks.length;
  const amountOfFinishedSubtasks = subtasks.filter(
    (subTask) => subTask.isCompleted === true
  ).length;

  return (
    <div>
      <h5 className="text-slate-200 font-medium">
        Subtasks ({amountOfFinishedSubtasks} of {amountOfSubtasks})
      </h5>
      <div className="flex flex-col gap-2 mt-3">
        {subtasks.map((subtask) => (
          <SubtaskListEntry
            onClick={() => onSubtaskClick(subtask)}
            key={subtask.title}
            subtask={subtask}
          />
        ))}
      </div>
    </div>
  );
}

function SubtaskListEntry({
  subtask,
  onClick,
}: {
  subtask: Subtask;
  onClick: () => void;
}) {
  return (
    <Button
      onClick={onClick}
      variant="custom"
      className="bg-slate-800 p-3 rounded-md flex items-center w-full hover:bg-slate-700 text-left group"
    >
      <span
        className={`w-6 h-6 rounded shrink-0 flex items-center  ${
          subtask.isCompleted
            ? "bg-primary-400 group-hover:bg-primary-300"
            : "bg-slate-500 group-hover:bg-slate-400"
        }`}
      >
        {subtask.isCompleted && <CheckIcon className=" p-1 text-white" />}
      </span>

      <span
        className={`font-semibold ml-4 w-full ${
          subtask.isCompleted ? "text-slate-400 line-through" : "text-slate-100"
        }`}
      >
        {subtask.title}
      </span>
    </Button>
  );
}
