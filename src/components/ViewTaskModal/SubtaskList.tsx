import { KanbanSubtaskData } from "../../api/kanbanBoard";
import Button from "../common/Button";
import CheckIcon from "../../assets/icon-check.svg";
import { useState } from "react";

interface Props {
  subtasks: KanbanSubtaskData[];
}

function SubtaskListEntry({ subtask }: { subtask: KanbanSubtaskData }) {
  const [isCompleted, setIsCompleted] = useState(subtask.isCompleted);

  function toggleIsCompleted() {
    setIsCompleted(!isCompleted);
  }

  return (
    <div className="bg-grey-light p-3 rounded-md flex items-center">
      <Button
        onClick={toggleIsCompleted}
        variant="custom"
        className={`h-6 w-6 p-1 pt-[5px] rounded border hover:shadow hover:border-secondary ${
          isCompleted ? "bg-primary" : "bg-white"
        }`}
      >
        {isCompleted && <img className="h-3 w-4" src={CheckIcon} />}
      </Button>
      <span
        className={`font-bold ml-4 ${
          isCompleted ? "text-slate-500 line-through" : "text-slate-900"
        }`}
      >
        {subtask.title}
      </span>
    </div>
  );
}

export default function SubtaskList({ subtasks }: Props) {
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
          <SubtaskListEntry key={subtask.title} subtask={subtask} />
        ))}
      </div>
    </>
  );
}
