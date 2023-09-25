import {
  useKanbanBoardQuery,
  useKanbanBoardMutation,
} from "../../api/kanbanBoard";
import { KanbanBoard } from "../../api/local-db";
import Modal from "../../components/Modal";
import BoardForm from "./BoardForm";

interface EditBoardModalProps {
  board: KanbanBoard;
  onClose: () => void;
}

export default function EditBoardModal({
  board,
  onClose,
}: EditBoardModalProps) {
  const boardMutation = useKanbanBoardMutation();

  function updateBoardData(editedBoard: KanbanBoard) {
    boardMutation.put(editedBoard).then(onClose);
  }

  return (
    <Modal onClose={onClose} header="Edit Board">
      <BoardForm board={board} onSubmit={updateBoardData} />
    </Modal>
  );
}
