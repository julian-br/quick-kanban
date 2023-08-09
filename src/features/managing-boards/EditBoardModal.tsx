import {
  useKanbanBoardQuery,
  useKanbanBoardMutation,
} from "../../api/kanbanBoard";
import Modal from "../../components/Modal";
import { KanbanBoard } from "../../api/types";
import BoardForm from "./BoardForm";

interface EditBoardModalProps {
  boardId: string;
  onClose: () => void;
}

export default function EditBoardModal(props: EditBoardModalProps) {
  const boardQuery = useKanbanBoardQuery(props.boardId);
  const boardUpdateMutation = useKanbanBoardMutation().update;

  function updateBoardData(editedBoard: KanbanBoard) {
    boardUpdateMutation.mutate(editedBoard, { onSuccess: () => props.onClose });
    props.onClose();
  }

  return (
    <Modal onClose={props.onClose} header="Edit Board">
      {boardQuery.isSuccess && (
        <BoardForm board={boardQuery.data} onSubmit={updateBoardData} />
      )}
    </Modal>
  );
}
