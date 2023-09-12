import Button from "../../components/Button";
import LoadingSpinner from "../../components/LoadingSpinner";
import Modal from "../../components/Modal";
import { useTaskMutation, useTaskQuery } from "../../api/task";

interface DeleteTaskModalProps {
  taskId: string;
  onClose: () => void;
}

export default function DeleteTaskModal({
  onClose,
  taskId,
}: DeleteTaskModalProps) {
  const taskDeleteMutation = useTaskMutation().delete;

  function handleDeleteTaskClick() {
    taskDeleteMutation.mutate(taskId, { onSuccess: onClose });
  }

  return (
    <Modal
      header={
        <div className="text-danger-500 text-2xl font-bold">
          Delete this Task?
        </div>
      }
      onClose={onClose}
    >
      <div>
        {taskDeleteMutation.isIdle && (
          <div>
            <p className="mt-7 text-slate-200">
              Are you sure you want to delete this Task? This action cannot be
              reversed.
            </p>
            <div className="mt-10 flex gap-5">
              <Button
                variant="danger"
                className="w-1/2"
                onClick={handleDeleteTaskClick}
              >
                Delete
              </Button>
              <Button variant="secondary" className="w-1/2" onClick={onClose}>
                Cancel
              </Button>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}
