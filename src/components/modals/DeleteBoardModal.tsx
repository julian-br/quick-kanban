import { useLocation } from "wouter";
import { useKanbanBoardMutation } from "../../api/kanbanBoard";
import Button from "../common/Button";
import Modal from "../common/Modal";

interface DeleteBoardModalProps {
  boardId: string;
  onClose: () => void;
}

export default function DeleteBoardModal({
  onClose,
  boardId,
}: DeleteBoardModalProps) {
  const boardDeleteMutation = useKanbanBoardMutation().deleteMutation;
  const [_, setLocation] = useLocation();

  function deleteBoard() {
    boardDeleteMutation.mutate(boardId, {
      onSuccess: () => {
        setLocation("/");
      },
    });
  }

  return (
    <Modal onClose={onClose}>
      <h4 className="text-danger text-2xl font-bold">Delete this board?</h4>
      <p className="mt-5 text-slate-500">
        Are you sure you want to delete the ‘Platform Launch’ board? This action
        will remove all columns and tasks and cannot be reversed.
      </p>
      <div className="mt-7 mb-5 flex gap-5">
        <Button variant="danger" className="w-1/2" onClick={deleteBoard}>
          Delete
        </Button>
        <Button variant="secondary" className="w-1/2" onClick={onClose}>
          Cancel
        </Button>
      </div>
    </Modal>
  );
}
