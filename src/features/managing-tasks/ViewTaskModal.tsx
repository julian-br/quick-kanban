import { useTaskQuery, useTaskMutation } from "../../api/task";
import Modal from "../../components/Modal";
import SubtaskList from "./SubtaskList";
import SettingsMenu from "../../components/SettingsMenu";
import { useAppModalManager } from "../../appModalManager";
import { PenIcon, TrashIcon } from "lucide-react";
import { Subtask, Task } from "../../api/local-db";

interface ViewTaskModalProps {
  taskId: number;
  onClose: () => void;
}

export default function ViewTaskModal({ taskId, onClose }: ViewTaskModalProps) {
  const task = useTaskQuery(taskId);
  const taskMutation = useTaskMutation();

  console.log("render");

  function toggleSubtaskStatus(clickedSubtask: Subtask) {
    if (task === undefined) {
      return;
    }
    const updatedSubtasks = task.subtasks.map((subtask) => {
      if (clickedSubtask.title === subtask.title) {
        subtask.isCompleted = !subtask.isCompleted;
      }

      return subtask;
    });

    taskMutation.put({ ...task, subtasks: updatedSubtasks });
  }

  return (
    <Modal
      onClose={onClose}
      header={
        <ViewTaskModalHeader taskId={taskId} taskTitle={task?.title ?? ""} />
      }
    >
      {task !== undefined && (
        <div className="w-full flex flex-col gap-6 mb-3">
          <p className="text-slate-300">{task.description}</p>
          <SubtaskList
            onSubtaskClick={toggleSubtaskStatus}
            subtasks={task.subtasks}
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
  taskId: number;
  taskTitle: string;
}) {
  const { showModal } = useAppModalManager();

  return (
    <>
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
    </>
  );
}
