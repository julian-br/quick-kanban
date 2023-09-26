import {
  useKanbanBoardQuery,
  useKanbanBoardMutation,
} from "../../api/kanbanBoard";
import { KanbanBoard } from "../../api/local-db";
import Modal from "../../components/Modal";
import BoardForm from "./BoardForm";

interface EditBoardModalProps {
  boardId: number;
  onClose: () => void;
}

export default function EditBoardModal({
  boardId,
  onClose,
}: EditBoardModalProps) {
  const board = useKanbanBoardQuery(boardId);
  const boardMutation = useKanbanBoardMutation();

  function updateBoardData(editedBoard: KanbanBoard) {
    boardMutation.put(editedBoard).then(onClose);
  }

  return (
    <Modal onClose={onClose} header="Edit Board">
      {board !== undefined && (
        <BoardForm board={board} onSubmit={updateBoardData} />
      )}
    </Modal>
  );
}
