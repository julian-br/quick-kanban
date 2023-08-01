import { useState } from "react";
import { KanbanBoard, useKanbanBoardsMutation } from "../../api/kanbanBoard";
import Button from "../../components/Button";
import Form from "../../components/Form";
import TextInput from "../../components/Input/TextInput";
import Modal from "../../components/Modal";

interface CreateColumnModalProps {
  board: KanbanBoard;
  onClose: () => void;
}

export function CreateColumnModal({ onClose, board }: CreateColumnModalProps) {
  const [newColumnName, setNewColumnName] = useState("");
  const [formError, setFormError] = useState("");

  const putKanbanBoard = useKanbanBoardsMutation().put;

  function validateColumnName() {
    return newColumnName !== "";
  }

  function handleSubmit() {
    if (validateColumnName() === false) {
      setFormError("please provide a valid column name");
      return;
    }

    setFormError("");
    const newBoardData = { ...board };
    newBoardData.columns.push(newColumnName);
    putKanbanBoard.mutate(newBoardData, { onSuccess: () => onClose() });
  }

  return (
    <Modal header="Add New Column" onClose={onClose}>
      <Form onSubmit={handleSubmit} className="mt-6">
        <TextInput
          value={newColumnName}
          onInput={(value) => setNewColumnName(value)}
          label="Column Name"
          placeholder="e.g. Todo"
          errorMessage={formError}
        />
        <Button
          type="submit"
          variant="primary"
          size="large"
          className="mt-10 w-full"
        >
          Create Column
        </Button>
      </Form>
    </Modal>
  );
}
