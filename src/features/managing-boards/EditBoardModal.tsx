import { useRef, useState } from "react";
import { useKanbanBoard, useKanbanBoardsMutation } from "../../api/kanbanBoard";
import Form from "../../components/Form";
import ListInput from "../../components/Input/ListInput";
import TextInput from "../../components/Input/TextInput";
import Modal from "../../components/Modal";
import Button from "../../components/Button";

interface EditBoardModalProps {
  boardId: string;
  onClose: () => void;
}

export default function EditBoardModal(props: EditBoardModalProps) {
  const activeBoardQuery = useKanbanBoard(props.boardId);

  if (activeBoardQuery.data === undefined) {
    return <></>;
  }

  const [boardData, setBoardData] = useState(activeBoardQuery.data);
  const boardPutMutation = useKanbanBoardsMutation().put;
  const isEdited = useRef(false);

  function editBoardName(newBoardName: string) {
    setBoardData({ ...boardData, name: newBoardName });
    isEdited.current = true;
  }

  function editColumnNames(newColumnNames: string[]) {
    setBoardData({ ...boardData, columns: newColumnNames });
    isEdited.current = true;
  }

  function updateBoardData() {
    if (isEdited.current === true) {
      boardPutMutation.mutate(boardData, { onSuccess: () => props.onClose });
    }
    props.onClose();
  }

  return (
    <Modal onClose={props.onClose} header="Edit Board">
      <Form className="mt-6" onSubmit={updateBoardData}>
        <TextInput
          label="Board Name"
          value={boardData.name}
          onInput={editBoardName}
        />
        <ListInput
          className="mt-6"
          label="Board Columns"
          addButtonText="Add Column"
          values={boardData.columns}
          onChange={editColumnNames}
        />
        <Button className="mt-6 w-full" variant="primary" type="submit">
          Save Changes
        </Button>
      </Form>
    </Modal>
  );
}
