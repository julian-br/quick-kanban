import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Subtask, Task, useTaskMutation } from "../../api/task";
import Listbox from "../common/Input/Listbox";
import Modal from "../common/Modal";
import SubtaskList from "./SubtaskList";

interface Props {
  task: Task;
  boardColumns: string[];
  onClose: () => void;
}

export default function ViewTaskModal({ task, onClose, boardColumns }: Props) {
  const [taskData, setTaskData] = useState(task);
  const taskMutation = useTaskMutation();

  function toggleSubtaskStatus(clickedSubtask: Subtask) {
    const clickedSubtaskIndex = taskData.subtasks.findIndex(
      (subtask) => subtask.title === clickedSubtask.title
    )!;

    const newSubtaskData = {
      title: clickedSubtask.title,
      isCompleted: !clickedSubtask.isCompleted,
    };

    const taskDataCopy = { ...taskData };
    taskDataCopy.subtasks[clickedSubtaskIndex] = newSubtaskData;
    setTaskData(taskDataCopy);
  }

  function changeTaskStatus(newStatus: string) {
    const taskCopy = { ...taskData };
    taskCopy.status = newStatus;
    setTaskData(taskCopy);
  }

  function handleModalClose() {
    taskMutation.mutate(taskData, { onSuccess: onClose });
  }

  return (
    <Modal onClose={handleModalClose} title={task.title}>
      <div className="w-full mt-7 flex flex-col gap-6 mb-4">
        <p className="text-slate-500">{task.description}</p>
        <SubtaskList
          onSubtaskClick={toggleSubtaskStatus}
          subtasks={task.subtasks}
        />
        <div>
          <Listbox
            label="Current Status"
            onChange={changeTaskStatus}
            selected={taskData.status}
            options={boardColumns}
          />
        </div>
      </div>
    </Modal>
  );
}
