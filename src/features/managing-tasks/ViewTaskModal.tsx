import { useEffect, useRef, useState } from "react";
import { useTaskQuery, useTaskMutation } from "../../api/task";
import Modal from "../../components/Modal";
import SubtaskList from "./SubtaskList";
import LoadingSpinner from "../../components/LoadingSpinner";
import SettingsMenu from "../../components/SettingsMenu";
import { useAppModalManager } from "../../appModalManager";
import { Subtask, Task } from "../../api/types";
import { PenIcon, TrashIcon } from "lucide-react";

interface ViewTaskModalProps {
  taskId: string;
  onClose: () => void;
}

export default function ViewTaskModal({ taskId, onClose }: ViewTaskModalProps) {
  const taskQuery = useTaskQuery(taskId);
  const [taskDataToEdit, setTaskDataToEdit] = useState<Task>();

  const taskUpdateMutation = useTaskMutation().put;

  useEffect(() => {
    setTaskDataToEdit(taskQuery.data);
  }, [taskQuery.data]);

  const taskIsModified = useRef(false);

  function toggleSubtaskStatus(clickedSubtask: Subtask) {
    if (taskDataToEdit === undefined) {
      return;
    }
    taskDataToEdit.subtasks.map((subtask) => {
      if (clickedSubtask.title === subtask.title) {
        subtask.isCompleted = !subtask.isCompleted;
      }
    });

    setTaskDataToEdit({ ...taskDataToEdit });
    taskIsModified.current = true;
  }

  function handleModalClose() {
    if (taskDataToEdit === undefined || taskIsModified.current === false) {
      onClose();
      return;
    }
    taskUpdateMutation.mutate(taskDataToEdit, { onSuccess: onClose });
  }

  const isLoading = taskUpdateMutation.isLoading || taskQuery.isLoading;

  return (
    <Modal
      onClose={handleModalClose}
      header={
        taskQuery.isSuccess && (
          <ViewTaskModalHeader
            taskId={taskId}
            taskTitle={taskQuery.data.title}
          />
        )
      }
    >
      {isLoading && (
        <div className="h-72 flex justify-center pt-20">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && taskDataToEdit !== undefined && (
        <div className="w-full flex flex-col gap-6 mb-3">
          <p className="text-slate-300">{taskDataToEdit.description}</p>
          <SubtaskList
            onSubtaskClick={toggleSubtaskStatus}
            subtasks={taskDataToEdit.subtasks}
          />
        </div>
      )}
    </Modal>
  );
}

function ViewTaskModalHeader({
  taskId,
  taskTitle,
}: {
  taskId: string;
  taskTitle: string;
}) {
  const { showModal } = useAppModalManager();
  const taskQuery = useTaskQuery(taskId);

  return (
    <>
      {taskQuery.isSuccess && (
        <div className="flex justify-between items-center">
          <h3>{taskTitle}</h3>
          <SettingsMenu>
            <SettingsMenu.Entry
              onClick={() =>
                showModal("editTaskModal", {
                  taskId,
                })
              }
            >
              <PenIcon className="h-4 mr-1" />
              <span>Edit Task</span>
            </SettingsMenu.Entry>
            <SettingsMenu.Entry
              onClick={() => showModal("deleteTaskModal", { taskId })}
            >
              <TrashIcon className="text-danger-400 h-4 mr-1" />
              <span className="text-danger-400">Delete Task</span>
            </SettingsMenu.Entry>
          </SettingsMenu>
        </div>
      )}
    </>
  );
}
