import { useState } from "react";
import { KanbanBoard, KanbanBoardColumn } from "../../api/types";
import Form from "../../components/Form";
import TextInput from "../../components/Input/TextInput";
import TextArea from "../../components/Input/TextArea";
import ListInput from "../../components/Input/ListInput";
import Button from "../../components/Button";

export type CreatedBoard = Omit<KanbanBoard, "id">;

type CreateBoardFormProps = {
  board?: undefined;
  onSubmit: (createdBoard: CreatedBoard) => void;
};

type EditBoardFormProps = {
  board: KanbanBoard;
  onSubmit: (editedBoard: KanbanBoard) => void;
};

type BoardFormProps<T> = T extends KanbanBoard
  ? EditBoardFormProps
  : CreateBoardFormProps;

function createEmptyBoard(): CreatedBoard {
  return {
    name: "",
    columns: [{ title: "", taskIds: [] }],
  };
}

export default function BoardForm<T extends KanbanBoard | undefined>({
  board,
  onSubmit,
}: BoardFormProps<T>) {
  const [editedBoard, setEditedBoard] = useState<KanbanBoard | CreatedBoard>(
    board ?? createEmptyBoard()
  );

  const isEditingBoard = board !== undefined;

  function handleSubmit() {
    if (board === undefined) {
      onSubmit(editedBoard as CreatedBoard);
      return;
    }

    onSubmit(editedBoard as KanbanBoard);
  }

  function handleBoardNameChange(newBoardName: string) {
    setEditedBoard({ ...editedBoard, name: newBoardName });
  }

  function handleColumnChange(newColumns: KanbanBoardColumn[]) {
    setEditedBoard({ ...editedBoard, columns: newColumns });
  }

  return (
    <Form onSubmit={handleSubmit} className="mt-7 mb-4 flex flex-col gap-6">
      <TextInput
        label="Board Name"
        value={editedBoard.name}
        onInput={handleBoardNameChange}
      />
      <ColumnInput
        columns={editedBoard.columns}
        onChange={handleColumnChange}
      />
      <Button className="mt-6 w-full" variant="primary" type="submit">
        {isEditingBoard ? "Save Changes" : "Create New Board"}
      </Button>
    </Form>
  );
}

function ColumnInput({
  columns,
  onChange,
}: {
  columns: KanbanBoardColumn[];
  onChange: (newColumns: KanbanBoardColumn[]) => void;
}) {
  const columnTitles = columns.map((column) => column.title);

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
