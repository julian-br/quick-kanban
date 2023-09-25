import Modal from "../../components/Modal";
import { useLocation } from "wouter";
import { useKanbanBoardMutation } from "../../api/kanbanBoard";
import BoardForm, { CreatedBoard } from "./BoardForm";

export default function CreateBoardModal({ onClose }: { onClose: () => void }) {
  const [_, setLocation] = useLocation();
  const boardMutation = useKanbanBoardMutation();

  function postNewBoard(newBoard: CreatedBoard) {
    boardMutation.post(newBoard).then((createdBoardId) => {
      setLocation(`/board/${createdBoardId}`);
      onClose();
    });
  }

  return (
    <Modal header="Add New Board" onClose={onClose}>
      <BoardForm onSubmit={postNewBoard} />
    </Modal>
  );
}
