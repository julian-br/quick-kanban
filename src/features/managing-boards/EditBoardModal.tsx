import { useRef, useState } from "react";
import {
  KanbanBoardColumn,
  useKanbanBoard,
  useKanbanBoardMutation,
} from "../../api/kanbanBoard";
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
  const boardUpdateMutation = useKanbanBoardMutation().update;
  const isEdited = useRef(false);

  function handleBoardNameChange(newBoardName: string) {
    setBoardData({ ...boardData, name: newBoardName });
    isEdited.current = true;
  }

  function handleColumnChange(newColumns: KanbanBoardColumn[]) {
    setBoardData({ ...boardData, columns: newColumns });
    isEdited.current = true;
  }

  function updateBoardData() {
    if (isEdited.current === true) {
      boardUpdateMutation.mutate(boardData, { onSuccess: () => props.onClose });
    }
    props.onClose();
  }

  return (
    <Modal onClose={props.onClose} header="Edit Board">
      <Form className="mt-6" onSubmit={updateBoardData}>
        <TextInput
          label="Board Name"
          value={boardData.name}
          onInput={handleBoardNameChange}
        />
        <ColumnInput
          columns={boardData.columns}
          onChange={handleColumnChange}
        />
        <Button className="mt-6 w-full" variant="primary" type="submit">
          Save Changes
        </Button>
      </Form>
    </Modal>
  );
}

function ColumnInput({
  columns,
  onChange,
}: {
  columns: KanbanBoardColumn[];
  onChange: (newSubtasks: KanbanBoardColumn[]) => void;
}) {
  const columnTitles = columns.map((subtask) => subtask.title);

  function handleColumnChange(newColumnTitles: string[]) {
    const columnWasAdded = newColumnTitles.length > columns.length;
    const columnWasDeleted = newColumnTitles.length < columns.length;

    if (columnWasAdded) {
      onChange([
        ...columns,
        {
          title: "",
          taskIds: [],
        },
      ]);
      return;
    }

    if (columnWasDeleted) {
      onChange(
        columns.filter((column) => newColumnTitles.includes(column.title))
      );
      return;
    }

    onChange(
      columns.map((column, index) => ({
        ...column,
        title: newColumnTitles[index],
      }))
    );
  }
  return (
    <ListInput
      label="Board Columns"
      inputPlaceHolder="e.g. Todo"
      addButtonText="Add new Column"
      values={columnTitles}
      onChange={handleColumnChange}
    />
  );
}
