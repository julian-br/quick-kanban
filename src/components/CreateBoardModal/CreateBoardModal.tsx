import Button from "../common/Button";
import Modal from "../common/Modal";
import TextInput from "../common/Input/TextInput";

import { useState } from "react";
import { BoardColumnsListInput } from "./BoardColumnsListInput";
import Form from "../common/Form";

export default function CreateBoardModal({ onClose }: { onClose: () => void }) {
  const [columnValues, setColumnValues] = useState([""]);

  function nameInputValidator(value: string) {
    if (value.length === 0) {
      return "Can't be empty";
    }
    return true;
  }

  function handleSubmit() {
    console.log("submit");
  }

  return (
    <Modal title="Add New Board" onClose={onClose}>
      <Form onSubmit={handleSubmit} className="mt-7">
        <TextInput
          name="test"
          label="Board Name"
          placeholder="e.g. Web Design"
        />

        <BoardColumnsListInput
          columnValues={columnValues}
          onColumnValuesChanged={setColumnValues}
        />
        <Button type="submit" className="w-full mt-7 mb-3" variant="primary">
          Create New Board
        </Button>
      </Form>
    </Modal>
  );
}
