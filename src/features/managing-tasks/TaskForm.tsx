import { useState } from "react";
import { Subtask, Task } from "../../api/task";
import Form from "../../components/Form";
import TextInput from "../../components/Input/TextInput";
import TextArea from "../../components/Input/TextArea";
import ListInput from "../../components/Input/ListInput";
import Button from "../../components/Button";

interface TaskFormProps {
  task?: Task;
  onSubmit: (editedTask: EditedTask) => void;
}

export type EditedTask = Omit<
  Task,
  "id" | "columnIndex" | "rowIndex" | "boardId"
>;

function createEmptyTask(): EditedTask {
  return {
    subtasks: [{ title: "", isCompleted: false }],
    description: "",
    title: "",
  };
}

export default function TaskForm(props: TaskFormProps) {
  const [taskDataToEdit, setTaskDataToEdit] = useState<EditedTask>(
    props.task ?? createEmptyTask()
  );

  const isEditingTask = props.task !== undefined;

  function handleTitleChanged(newTitle: string) {
    setTaskDataToEdit({ ...taskDataToEdit, title: newTitle });
  }

  function handleDescriptionChanged(newDescription: string) {
    setTaskDataToEdit({ ...taskDataToEdit, description: newDescription });
  }

  function handleSubtasksChanged(newSubtasks: Subtask[]) {
    setTaskDataToEdit({ ...taskDataToEdit, subtasks: newSubtasks });
  }

  function handleSubmit() {
    props.onSubmit(taskDataToEdit);
  }

  return (
    <Form onSubmit={handleSubmit} className="mt-7 mb-4 flex flex-col gap-6">
      <TextInput
        onInput={handleTitleChanged}
        value={taskDataToEdit.title}
        label="Title"
        placeholder="e.g Take coffee break"
      />
      <TextArea
        onInput={handleDescriptionChanged}
        value={taskDataToEdit.description}
        rows={4}
        label="Description"
        placeholder="e.g. It's always good to take a break. This 15 minute break will recharge the batteries a little."
      />
      <SubtaskInput
        subtasks={taskDataToEdit.subtasks}
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
