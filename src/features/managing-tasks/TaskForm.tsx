import { Subtask, Task } from "../../api/types";
import Form from "../../components/Form";
import TextInput from "../../components/Input/TextInput";
import TextArea from "../../components/Input/TextArea";
import ListInput from "../../components/Input/ListInput";
import Button from "../../components/Button";
import { Controller, FieldValues, useForm } from "react-hook-form";
import Modal from "../../components/Modal";

export type CreatedTask = Omit<Task, "id">;

type CreateTaskFormProps = {
  task?: undefined;
  onSubmit: (createdTask: CreatedTask) => void;
};

type EditTaskFormProps = {
  task: Task;
  onSubmit: (editedTask: Task) => void;
};

type TaskFormProps<T> = T extends Task
  ? EditTaskFormProps
  : CreateTaskFormProps;

export default function TaskForm<T extends Task | undefined>({
  task,
  onSubmit,
}: TaskFormProps<T>) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const isEditingTask = task !== undefined;

  function handleValidSubmit(data: FieldValues) {
    if (task === undefined) {
      onSubmit({
        title: data.taskTitle,
        description: data.taskDescription ?? "",
        subtasks: data.subtasks,
      });
      return;
    }

    onSubmit({
      ...task,
      title: data.taskTitle,
      description: data.taskDescription ?? "",
      subtasks: data.subtasks,
    });
  }

  function validateSubtasks(subtasks: Subtask[]) {
    for (const subtask of subtasks) {
      if (subtask.title === "") {
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
        {...register("taskTitle", { required: true })}
        defaultValue={task?.title}
        label="Title"
        placeholder="e.g Take coffee break"
        errorMessage={errors.taskTitle && "Can't be empty"}
      />
      <TextArea
        {...register("taskDescription")}
        defaultValue={task?.description}
        rows={4}
        label="Description"
        placeholder="e.g. It's always good to take a break. This 15 minute break will recharge the batteries a little."
      />
      <Controller
        name="subtasks"
        rules={{ validate: validateSubtasks }}
        defaultValue={task?.subtasks ?? [{ title: "", isCompleted: false }]}
        control={control}
        render={({ field }) => (
          <SubtaskInput
            subtasks={field.value}
            onChange={field.onChange}
            errorMessage={errors.subtasks && "Subtask names can't be empty"}
          />
        )}
      />
      <Button variant="primary" size="large" className="mt-3" type="submit">
        {isEditingTask ? "Save Changes" : "Add New Task"}
      </Button>
    </Form>
  );
}

function SubtaskInput({
  subtasks,
  onChange,
  errorMessage,
}: {
  subtasks: Subtask[];
  errorMessage?: string;
  onChange: (newSubtasks: Subtask[]) => void;
}) {
  const subtaskTitles = subtasks.map((subtask) => subtask.title);

  function handleSubtaskEdit(newSubtaskTitles: string[]) {
    onChange(
      subtasks.map((subtask, index) => ({
        ...subtask,
        title: newSubtaskTitles[index],
      }))
    );
  }
  function handleSubtaskAdded() {
    onChange([
      ...subtasks,
      {
        title: "",
        isCompleted: false,
      },
    ]);
  }

  function handleSubtaskDeleted(index: number) {
    onChange(subtasks.filter((_, subtaskIndex) => subtaskIndex !== index));
  }

  return (
    <ListInput
      label="Subtasks"
      values={subtaskTitles}
      onEdit={handleSubtaskEdit}
      onAdd={handleSubtaskAdded}
      onDelete={(_, index) => handleSubtaskDeleted(index)}
      addButtonText="Add New Subtask"
      errorMessage={errorMessage}
      inputPlaceHolder="e.g Make coffee"
    />
  );
}
