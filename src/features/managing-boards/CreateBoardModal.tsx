import Modal from "../../components/Modal";
import { useLocation } from "wouter";
import { useKanbanBoardMutation } from "../../api/kanbanBoard";
import BoardForm, { CreatedBoard } from "./BoardForm";

export default function CreateBoardModal({ onClose }: { onClose: () => void }) {
  const [_, setLocation] = useLocation();
  const boardPostMutation = useKanbanBoardMutation().post;

  function postNewBoard(newBoard: CreatedBoard) {
    boardPostMutation.mutate(newBoard, {
      onSuccess: (newBoard) => {
        setLocation(`/board/${newBoard.id}`);
        onClose();
      },
    });
  }

  return (
    <Modal header="Add New Board" onClose={onClose}>
      <BoardForm onSubmit={postNewBoard} />
    </Modal>
  );
}
