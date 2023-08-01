import { useRef, useState } from "react";
import { Subtask, Task, useTaskMutation } from "../../api/task";
import Listbox from "../../components/Input/Listbox";
import Modal from "../../components/Modal";
import SubtaskList from "./SubtaskList";
import LoadingSpinner from "../../components/LoadingSpinner";
import ContextMenu from "../../components/ContextMenu";

interface Props {
  task: Task;
  boardColumns: string[];
  onClose: () => void;
}

export default function ViewTaskModal({ task, onClose, boardColumns }: Props) {
  const [taskData, setTaskData] = useState(task);
  const taskPutMutation = useTaskMutation().put;
  const taskDeleteMutation = useTaskMutation().delete;
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
    taskPutMutation.mutate(taskData, { onSuccess: onClose });
  }

  function handleDeleteTaskClicked() {
    taskDeleteMutation.mutate(task.id, { onSuccess: onClose });
  }

  const isLoading = taskDeleteMutation.isLoading || taskPutMutation.isLoading;

  return (
    <Modal
      onClose={handleModalClose}
      header={
        <div className="flex justify-between items-center">
          <h3>{task.title}</h3>
          <ContextMenu>
            <ContextMenu.Entry>Edit Task</ContextMenu.Entry>
            <ContextMenu.Entry onClick={handleDeleteTaskClicked}>
              <span className="text-danger-400">Delete Task</span>
            </ContextMenu.Entry>
          </ContextMenu>
        </div>
      }
    >
      {isLoading && (
        <div className="h-72 flex justify-center pt-20">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && (
        <div className="w-full flex flex-col gap-6 mb-3">
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
