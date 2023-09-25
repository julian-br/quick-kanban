import Form from "../../components/Form";
import TextInput from "../../components/Input/TextInput";
import ListInput from "../../components/Input/ListInput";
import Button from "../../components/Button";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { KanbanBoard, KanbanBoardColumn } from "../../api/local-db";

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

export default function BoardForm<T extends KanbanBoard | undefined>({
  board,
  onSubmit,
}: BoardFormProps<T>) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const isEditingBoard = board !== undefined;

  function handleValidSubmit(data: FieldValues) {
    if (board === undefined) {
      onSubmit({ name: data.boardName, columns: data.boardColumns });
      return;
    }

    console.log(data);

    onSubmit({ ...board, name: data.boardName, columns: data.boardColumns });
  }

  function validateColumns(columns: KanbanBoardColumn[]) {
    if (columns.length === 0) {
      return false;
    }
    for (const column of columns) {
      if (column.title === "") {
        return false;
      }
    }
    return true;
  }

  return (
    <Form
      onSubmit={handleSubmit(handleValidSubmit)}
      className="mt-7 mb-4 flex flex-col gap-6"
    >
      <TextInput
        label="Board Name"
        autoComplete="off"
        {...register("boardName", { required: true })}
        errorMessage={errors.boardName && "Can't be empty"}
        defaultValue={board?.name}
        placeholder="e.g Web Design"
      />
      <Controller
        name="boardColumns"
        rules={{ validate: validateColumns }}
        defaultValue={board?.columns ?? [{ title: "", taskIds: [] }]}
        control={control}
        render={({ field }) => (
          <ColumnInput
            columns={field.value}
            onChange={field.onChange}
            errorMessage={errors.boardColumns && "Columns can't be empty"}
          />
        )}
      />
      <Button
        className="mt-6 w-full"
        variant="primary"
        size="large"
        type="submit"
      >
        {isEditingBoard ? "Save Changes" : "Create New Board"}
      </Button>
    </Form>
  );
}

function ColumnInput({
  columns,
  errorMessage,
  onChange,
}: {
  columns: KanbanBoardColumn[];
  errorMessage?: string;
  onChange: (newColumns: KanbanBoardColumn[]) => void;
}) {
  const columnTitles = columns.map((column) => column.title);

  function handleColumnEdited(newColumnTitles: string[]) {
    onChange(
      columns.map((column, index) => ({
        ...column,
        title: newColumnTitles[index],
      }))
    );
  }

  function handleColumnAdded() {
    onChange([...columns, { title: "", taskIds: [] }]);
  }

  function handleColumnDeleted(index: number) {
    onChange(columns.filter((_, colIndex) => colIndex !== index));
  }

  return (
    <ListInput
      label="Board Columns"
      inputPlaceHolder="e.g. Todo"
      addButtonText="Add new Column"
      errorMessage={errorMessage}
      values={columnTitles}
      onEdit={handleColumnEdited}
      onAdd={handleColumnAdded}
      onDelete={(_, index) => handleColumnDeleted(index)}
    />
  );
}
