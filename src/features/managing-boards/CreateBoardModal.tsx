import Button from "../../components/Button";
import Modal from "../../components/Modal";
import TextInput from "../../components/Input/TextInput";
import { useState } from "react";
import Form, { useFormValidation } from "../../components/Form";
import { useLocation } from "wouter";
import { useKanbanBoardMutation } from "../../api/kanbanBoard";
import ListInput from "../../components/Input/ListInput";

export default function CreateBoardModal({ onClose }: { onClose: () => void }) {
  const [boardColumnNames, setBoardColumnNames] = useState([""]);
  const [boardName, setBoardName] = useState("");

  const [_, setLocation] = useLocation();
  const boardPutMutation = useKanbanBoardMutation().put;

  const { formErrors, validateForm } = useFormValidation({
    boardName: () => (boardName?.length > 0 ? true : "Can't be empty"),
    boardColumnNames: validateColumnNames,
  });

  function validateColumnNames() {
    const noColumnsProvided = boardColumnNames.length === 0;
    if (noColumnsProvided) {
      return "Please add at least one column.";
    }

    const hasEmptyValues =
      boardColumnNames.filter((columnName) => columnName === "").length > 0;
    if (hasEmptyValues) {
      return "Please provide a name for each column.";
    }

    const columnNamesSet = new Set(boardColumnNames);
    const hasDuplicateNames = columnNamesSet.size !== boardColumnNames.length;
    if (hasDuplicateNames) {
      return "Please provide a unique name for each column.";
    }
    return true;
  }

  function handleSubmit() {
    const formIsValid = validateForm();
    if (formIsValid) {
      const newBoard = {
        name: boardName,
        columns: boardColumnNames,
      };
      boardPutMutation.mutate(newBoard, {
        onSuccess: (mutatedBoard) => {
          setLocation(`/board/${mutatedBoard.id}`);
          onClose();
        },
      });
    }
  }

  return (
    <Modal header="Add New Board" onClose={onClose}>
      <Form onSubmit={handleSubmit} className="mt-7 flex flex-col gap-5">
        <TextInput
          value={boardName}
          onInput={setBoardName}
          errorMessage={formErrors.boardName}
          name="test"
          label="Board Name"
          placeholder="e.g. Web Design"
        />

        <ListInput
          label="Board Columns"
          inputPlaceHolder="e.g Todo"
          addButtonText="Add new Column"
          values={boardColumnNames}
          onChange={setBoardColumnNames}
          errorMessage={formErrors.boardColumnNames}
        />
        <Button type="submit" className="w-full mb-3 mt-8" variant="primary">
          Create New Board
        </Button>
      </Form>
    </Modal>
  );
}
