import Button from "../../components/Button";
import Modal from "../../components/Modal";
import TextInput from "../../components/Input/TextInput";
import { useState } from "react";
import Form from "../../components/Form";
import { useLocation } from "wouter";
import { useKanbanBoardMutation } from "../../api/kanbanBoard";
import ListInput from "../../components/Input/ListInput";

export default function CreateBoardModal({ onClose }: { onClose: () => void }) {
  const [boardColumnNames, setBoardColumnNames] = useState([""]);
  const [boardName, setBoardName] = useState("");

  const [_, setLocation] = useLocation();
  const boardPostMutation = useKanbanBoardMutation().post;

  function handleSubmit() {
    const newBoard = {
      name: boardName,
      columns: boardColumnNames.map((columnName) => ({
        title: columnName,
        taskIds: [],
      })),
    };
    boardPostMutation.mutate(newBoard, {
      onSuccess: (mutatedBoard) => {
        setLocation(`/board/${mutatedBoard.id}`);
        onClose();
      },
    });
  }

  return (
    <Modal header="Add New Board" onClose={onClose}>
      <Form onSubmit={handleSubmit} className="mt-7 flex flex-col gap-5">
        <TextInput
          value={boardName}
          onInput={setBoardName}
          name="test"
          label="Board Name"
          placeholder="e.g. Web Design"
        />

        <ListInput
          label="Board Columns"
          inputPlaceHolder="e.g. Todo"
          addButtonText="Add new Column"
          values={boardColumnNames}
          onChange={setBoardColumnNames}
        />
        <Button type="submit" className="w-full mb-3 mt-8" variant="primary">
          Create New Board
        </Button>
      </Form>
    </Modal>
  );
}
