import { useLocation } from "wouter";
import { useKanbanBoardsMutation } from "../../api/kanbanBoard";
import Button from "../../components/Button";
import LoadingSpinner from "../../components/LoadingSpinner";
import Modal from "../../components/Modal";

interface DeleteBoardModalProps {
  boardId: string;
  onClose: () => void;
}

export default function DeleteBoardModal({
  onClose,
  boardId,
}: DeleteBoardModalProps) {
  const boardDeleteMutation = useKanbanBoardsMutation().delete;
  const [_, setLocation] = useLocation();

  function deleteBoard() {
    boardDeleteMutation.mutate(boardId, {
      onSuccess: () => {
        onClose();
        setLocation("/");
      },
    });
  }

  return (
    <Modal
      header={
        <div className="text-danger-500 text-2xl font-bold">
          Delete this board?
        </div>
      }
      onClose={onClose}
    >
      <div>
        {boardDeleteMutation.isLoading && (
          <div className="flex pb-7 h-full items-center justify-center">
            <LoadingSpinner />
          </div>
        )}
        {boardDeleteMutation.isIdle && (
          <div>
            <p className="mt-7 text-slate-200">
              Are you sure you want to delete this board? This action will
              remove all columns and tasks and cannot be reversed.
            </p>
            <div className="mt-10 flex gap-5">
              <Button variant="danger" className="w-1/2" onClick={deleteBoard}>
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
