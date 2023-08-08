import { useState } from "react";
import { Subtask, Task } from "../../api/types";
import Form from "../../components/Form";
import TextInput from "../../components/Input/TextInput";
import TextArea from "../../components/Input/TextArea";
import ListInput from "../../components/Input/ListInput";
import Button from "../../components/Button";

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

function createEmptyTask(): CreatedTask {
  return {
    subtasks: [{ title: "", isCompleted: false }],
    description: "",
    title: "",
  };
}

export default function TaskForm<T extends Task | undefined>({
  task,
  onSubmit,
}: TaskFormProps<T>) {
  const [editedTask, setEditedTask] = useState<Task | CreatedTask>(
    task ?? createEmptyTask()
  );

  const isEditingTask = task !== undefined;

  function handleTitleChanged(newTitle: string) {
    setEditedTask({ ...editedTask, title: newTitle });
  }

  function handleDescriptionChanged(newDescription: string) {
    setEditedTask({ ...editedTask, description: newDescription });
  }

  function handleSubtasksChanged(newSubtasks: Subtask[]) {
    setEditedTask({ ...editedTask, subtasks: newSubtasks });
  }

  function handleSubmit() {
    if (task === undefined) {
      onSubmit(editedTask as CreatedTask);
      return;
    }

    onSubmit(editedTask as Task);
  }

  return (
    <Form onSubmit={handleSubmit} className="mt-7 mb-4 flex flex-col gap-6">
      <TextInput
        onInput={handleTitleChanged}
        value={editedTask.title}
        label="Title"
        placeholder="e.g Take coffee break"
      />
      <TextArea
        onInput={handleDescriptionChanged}
        value={editedTask.description}
        rows={4}
        label="Description"
        placeholder="e.g. It's always good to take a break. This 15 minute break will recharge the batteries a little."
      />
      <SubtaskInput
        subtasks={editedTask.subtasks}
        onChange={handleSubtasksChanged}
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
}: {
  subtasks: Subtask[];
  onChange: (newSubtasks: Subtask[]) => void;
}) {
  const subtaskTitles = subtasks.map((subtask) => subtask.title);

  function handleSubtaskChange(newSubtaskTitles: string[]) {
    const subtaskWasAdded = newSubtaskTitles.length > subtasks.length;
    const subtaskWasDelted = newSubtaskTitles.length < subtasks.length;

    if (subtaskWasAdded) {
      onChange([
        ...subtasks,
        {
          title: "",
          isCompleted: false,
        },
      ]);
      return;
    }

    if (subtaskWasDelted) {
      onChange(
        subtasks.filter((subtask) => newSubtaskTitles.includes(subtask.title))
      );
      return;
    }

    onChange(
      subtasks.map((subtask, index) => ({
        ...subtask,
        title: newSubtaskTitles[index],
      }))
    );
  }
  return (
    <ListInput
      label="Subtasks"
      values={subtaskTitles}
      onChange={handleSubtaskChange}
      addButtonText="Add New Subtask"
      inputPlaceHolder="e.g Make coffee"
    />
  );
}
