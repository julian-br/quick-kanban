import Button from "../common/Button";
import Modal from "../common/Modal";
import TextInput from "../common/Input/TextInput";
import { useState } from "react";
import { BoardColumnsListInput } from "./ColumnsListInput";
import Form, { useFormValidation } from "../common/Form";
import { postKanbanBoard } from "../../api/kanbanBoard";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation } from "wouter";

export default function CreateBoardModal({ onClose }: { onClose: () => void }) {
  const [boardColumnNames, setBoardColumnNames] = useState([""]);
  const [boardName, setBoardName] = useState("");

  const [_, setLocation] = useLocation();
  const boardDataMutation = useMutation(postKanbanBoard, {
    onSuccess: (postedBoard) => {
      setLocation("/board/" + postedBoard.id);
      onClose();
    },
  });

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
      boardDataMutation.mutate({
        name: boardName,
        columNames: boardColumnNames,
      });
    }
  }

  return (
    <Modal title="Add New Board" onClose={onClose}>
      <Form onSubmit={handleSubmit} className="mt-7 flex flex-col gap-5">
        <TextInput
          value={boardName}
          onInput={setBoardName}
          errorMessage={formErrors.boardName}
          name="test"
          label="Board Name"
          placeholder="e.g. Web Design"
        />

        <BoardColumnsListInput
          columnValues={boardColumnNames}
          onColumnValuesChange={setBoardColumnNames}
          errorMessage={formErrors.boardColumnNames}
        />
        <Button type="submit" className="w-full mb-3 mt-4" variant="primary">
          Create New Board
        </Button>
      </Form>
    </Modal>
  );
}
