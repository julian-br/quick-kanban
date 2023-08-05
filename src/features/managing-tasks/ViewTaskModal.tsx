import { useEffect, useRef, useState } from "react";
import { Subtask, Task, useTask, useTaskMutation } from "../../api/task";
import Modal from "../../components/Modal";
import SubtaskList from "./SubtaskList";
import LoadingSpinner from "../../components/LoadingSpinner";
import ContextMenu from "../../components/ContextMenu";
import { useAppModalManager } from "../../appModalManager";

interface ViewTaskModalProps {
  taskId: string;
  onClose: () => void;
}

export default function ViewTaskModal({ taskId, onClose }: ViewTaskModalProps) {
  const taskQuery = useTask(taskId);
  const [taskDataToEdit, setTaskDataToEdit] = useState<Task>();

  const taskPutMutation = useTaskMutation().put;

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
    taskPutMutation.mutate(taskDataToEdit, { onSuccess: onClose });
  }

  const isLoading = taskPutMutation.isLoading || taskQuery.isLoading;

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
  const taskQuery = useTask(taskId);

  return (
    <>
      {taskQuery.isSuccess && (
        <div className="flex justify-between items-center">
          <h3>{taskTitle}</h3>
          <ContextMenu>
            <ContextMenu.Entry
              onClick={() =>
                showModal("editTaskModal", {
                  taskId,
                })
              }
            >
              Edit Task
            </ContextMenu.Entry>
            <ContextMenu.Entry
              onClick={() => showModal("deleteTaskModal", { taskId })}
            >
              <span className="text-danger-400">Delete Task</span>
            </ContextMenu.Entry>
          </ContextMenu>
        </div>
      )}
    </>
  );
}
