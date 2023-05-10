import { useRef, useState } from "react";
import { Subtask, Task, useTaskMutation } from "../../api/task";
import Listbox from "../../components/Input/Listbox";
import Modal from "../../components/Modal";
import SubtaskList from "./SubtaskList";
import LoadingSpinner from "../../components/LoadingSpinner";

interface Props {
  task: Task;
  boardColumns: string[];
  onClose: () => void;
}

export default function ViewTaskModal({ task, onClose, boardColumns }: Props) {
  const [taskData, setTaskData] = useState(task);
  const taskMutation = useTaskMutation();
  const taskIsModified = useRef(false);

  function toggleSubtaskStatus(clickedSubtask: Subtask) {
    taskIsModified.current = true;
    taskData.subtasks.map((subtask) => {
      if (clickedSubtask.title === subtask.title) {
        subtask.isCompleted = !subtask.isCompleted;
      }
    });
    setTaskData({ ...taskData });
  }

  function changeTaskStatus(newStatus: string) {
    taskIsModified.current = true;
    setTaskData({ ...taskData, status: newStatus });
  }

  function handleModalClose() {
    if (taskIsModified.current === false) {
      onClose();
      return;
    }
    taskMutation.mutate(taskData, { onSuccess: onClose });
  }

  return (
    <Modal onClose={handleModalClose} title={task.title}>
      {taskMutation.isLoading && (
        <div className="h-72 flex justify-center pt-20">
          <LoadingSpinner />
        </div>
      )}
      {taskMutation.isIdle && (
        <div className="w-full mt-7 flex flex-col gap-6 mb-4">
          <p className="text-slate-300">{task.description}</p>
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
      )}
    </Modal>
  );
}
