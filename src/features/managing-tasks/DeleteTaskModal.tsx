import Button from "../../components/Button";
import LoadingSpinner from "../../components/LoadingSpinner";
import Modal from "../../components/Modal";
import { useTaskMutation } from "../../api/task";
import { useAppModalManager } from "../../appModalManager";

interface DeleteTaskModalProps {
  taskId: string;
  onClose: () => void;
}

export default function DeleteTaskModal({
  onClose,
  taskId,
}: DeleteTaskModalProps) {
  const taskDeleteMutation = useTaskMutation().delete;
  const { showModal } = useAppModalManager();

  function handleDeleteTaskClicked() {
    taskDeleteMutation.mutate(taskId, { onSuccess: onClose });
  }

  function handleCancelClicked() {
    onClose();
    showModal("viewTaskModal", { taskId });
  }

  return (
    <Modal
      header={
        <h3 className="text-danger-500 text-2xl font-bold">
          Delete this Task?
        </h3>
      }
      onClose={onClose}
    >
      <div>
        {taskDeleteMutation.isLoading && (
          <div className="flex pb-7 h-full items-center justify-center">
            <LoadingSpinner />
          </div>
        )}
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
                onClick={handleDeleteTaskClicked}
              >
                Delete
              </Button>
              <Button
                variant="secondary"
                className="w-1/2"
                onClick={handleCancelClicked}
              >
                Cancel
              </Button>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}
