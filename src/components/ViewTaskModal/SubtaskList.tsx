import Button from "../common/Button";
import CheckIcon from "../../assets/icon-check.svg";
import { Subtask } from "../../api/task";
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
    <>
      <h5 className="text-slate-500 font-medium">
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
    </>
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
      className="bg-grey-light p-3 rounded-md flex items-center w-full hover:bg-secondary hover:shadow text-left"
    >
      <span
        className={`h-6 w-6 p-1 pt-[5px] rounded border ${
          subtask.isCompleted ? "bg-primary" : "bg-white"
        }`}
      >
        {subtask.isCompleted && <img className="h-3 w-4" src={CheckIcon} />}
      </span>

      <span
        className={`font-bold ml-4 w-full ${
          subtask.isCompleted ? "text-slate-500 line-through" : "text-slate-900"
        }`}
      >
        {subtask.title}
      </span>
    </Button>
  );
}
