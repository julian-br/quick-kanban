import { useTaskQuery, useTaskMutation } from "../../api/task";
import Modal from "../../components/Modal";
import SubtaskList from "./SubtaskList";
import SettingsMenu from "../../components/SettingsMenu";
import { useAppModalManager } from "../../appModalManager";
import { PenIcon, TrashIcon } from "lucide-react";
import { Subtask } from "../../api/local-db";

interface ViewTaskModalProps {
  taskId: number;
  onClose: () => void;
}

export default function ViewTaskModal({ taskId, onClose }: ViewTaskModalProps) {
  const taskQuery = useTaskQuery(taskId);
  const taskMutation = useTaskMutation();

  function toggleSubtaskStatus(clickedSubtask: Subtask) {
    if (taskQuery === undefined) {
      return;
    }

    const updatedSubtasks = taskQuery.subtasks.map((subtask) => {
      if (clickedSubtask.title === subtask.title) {
        subtask.isCompleted = !subtask.isCompleted;
      }

      return subtask;
    });

    taskMutation.put({ ...taskQuery, subtasks: updatedSubtasks });
  }

  return (
    <Modal
      onClose={onClose}
      header={
        taskQuery !== undefined && (
          <ViewTaskModalHeader taskId={taskId} taskTitle={taskQuery.title} />
        )
      }
    >
      {taskQuery !== undefined && (
        <div className="w-full flex flex-col gap-6 mb-3">
          <p className="text-slate-300">{taskQuery.description}</p>
          <SubtaskList
            onSubtaskClick={toggleSubtaskStatus}
            subtasks={taskQuery.subtasks}
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
