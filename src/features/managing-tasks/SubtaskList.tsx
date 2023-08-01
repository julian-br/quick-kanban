import Button from "../../components/Button";
import { Subtask } from "../../api/task";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
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
      className="bg-slate-700 p-3 rounded-md flex items-center w-full hover:bg-slate-600 text-left group"
    >
      <span
        className={`w-[1.9rem] h-7 rounded  ${
          subtask.isCompleted
            ? "bg-primary-400 group-hover:bg-primary-300"
            : "bg-slate-500 group-hover:bg-slate-400"
        }`}
      >
        {subtask.isCompleted && (
          <FontAwesomeIcon className="h-4 ml-2 text-white" icon={faCheck} />
        )}
      </span>

      <span
        className={`font-bold ml-4 w-full ${
          subtask.isCompleted ? "text-slate-400 line-through" : "text-slate-100"
        }`}
      >
        {subtask.title}
      </span>
    </Button>
  );
}
