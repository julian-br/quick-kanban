import { useState } from "react";
import { KanbanBoard } from "../../api/kanbanBoard";
import { useTaskMutation } from "../../api/task";
import Button from "../common/Button";
import Form, { useFormValidation } from "../common/Form";
import Listbox from "../common/Input/Listbox";
import ListInput from "../common/Input/ListInput";
import TextArea from "../common/Input/TextArea";
import TextInput from "../common/Input/TextInput";
import LoadingSpinner from "../common/LoadingSpinner";
import Modal from "../common/Modal";

interface CreateTaskModalProps {
  board: KanbanBoard;
  columnName?: string;
  onClose: () => void;
}

export default function CreateTaskModal({
  onClose,
  board,
  columnName,
}: CreateTaskModalProps) {
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    status: columnName ?? board.columns[0],
    subtaskTitles: [""],
  });

  const { formErrors, validateForm } = useFormValidation({
    title: () => (taskData.title?.length > 0 ? true : "Can't be empty"),
    subtaskNames: validateSubtaskTitles,
  });

  const taskMutation = useTaskMutation();

  function validateSubtaskTitles() {
    const hasEmptyValues =
      taskData.subtaskTitles.filter((columnName) => columnName === "").length >
      0;
    if (hasEmptyValues) {
      return "Please provide a name for each column.";
    }

    return true;
  }

  function changeTaskStatus(newStatus: string) {
    const taskCopy = { ...taskData };
    taskCopy.status = newStatus;
    setTaskData(taskCopy);
  }

  function changeTitle(newTitle: string) {
    setTaskData({ ...taskData, title: newTitle });
  }

  function changeDescription(newDescription: string) {
    setTaskData({ ...taskData, description: newDescription });
  }

  function changeSubtaskNames(newSubtaskNames: string[]) {
    setTaskData({ ...taskData, subtaskTitles: newSubtaskNames });
  }

  function handleSubmit() {
    const formIsValid = validateForm();
    if (formIsValid) {
      // don't add subtasks with an empty string as a title
      const trimmedSubtaskTitles = taskData.subtaskTitles.filter(
        (subtaskName) => subtaskName !== ""
      );

      const newTask = {
        ...taskData,
        boardId: board.id,
        subtasks: trimmedSubtaskTitles.map((subtaskTitle) => ({
          title: subtaskTitle,
          isCompleted: false,
        })),
      };

      taskMutation.mutate(newTask, { onSuccess: onClose });
    }
  }

  return (
    <Modal onClose={onClose} title={"Add New Task"}>
      {taskMutation.isLoading && (
        <div className="h-52 mb-16 flex items-center justify-center">
          <LoadingSpinner />
        </div>
      )}
      {!taskMutation.isLoading && (
        <Form onSubmit={handleSubmit} className="mt-7 mb-4 flex flex-col gap-6">
          <TextInput
            errorMessage={formErrors.title}
            onInput={changeTitle}
            value={taskData.title}
            label="Title"
            placeholder="e.g Take coffee break"
          />
          <TextArea
            onInput={changeDescription}
            value={taskData.description}
            rows={4}
            label="Description"
            placeholder="e.g. It's always good to take a break. This 15 minute break will recharge the batteries a little."
          />
          <ListInput
            errorMessage={formErrors.subtaskNames}
            label="Subtasks"
            values={taskData.subtaskTitles}
            onChange={changeSubtaskNames}
            addButtonText="Add New Subtask"
            inputPlaceHolder="e.g Make coffee"
          />
          <Listbox
            label="Status"
            onChange={changeTaskStatus}
            selected={taskData.status}
            options={board.columns}
          />
          <Button variant="primary" size="large" className="mt-3" type="submit">
            Create Task
          </Button>
        </Form>
      )}
    </Modal>
  );
}
