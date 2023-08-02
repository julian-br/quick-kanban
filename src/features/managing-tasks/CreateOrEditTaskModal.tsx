import { cloneElement, useState } from "react";
import { KanbanBoard } from "../../api/kanbanBoard";
import { Task, useTaskMutation } from "../../api/task";
import Button from "../../components/Button";
import Form, { useFormValidation } from "../../components/Form";
import Listbox from "../../components/Input/Listbox";
import ListInput from "../../components/Input/ListInput";
import TextArea from "../../components/Input/TextArea";
import TextInput from "../../components/Input/TextInput";
import LoadingSpinner from "../../components/LoadingSpinner";
import Modal from "../../components/Modal";
import { Optional } from "../../utils/utilityTypes";

interface CreateTaskModalProps {
  board: KanbanBoard;
  onClose: () => void;
  selectedTask?: Task;
}

export default function CreateOrEditTaskModal({
  onClose,
  board,
  selectedTask,
}: CreateTaskModalProps) {
  const [taskData, setTaskData] = useState({
    id: selectedTask?.id,
    title: selectedTask?.title ?? "",
    description: selectedTask?.description ?? "",
    columnIndex: selectedTask?.columnIndex ?? 0,
    subtaskTitles: selectedTask?.subtasks.map((subTask) => subTask.title) ?? [
      "",
    ],
  });

  const { formErrors, validateForm } = useFormValidation({
    title: () => (taskData.title?.length > 0 ? true : "Can't be empty"),
    subtaskNames: validateSubtaskTitles,
  });

  const taskPutMutation = useTaskMutation().put;

  const isEditingTask = selectedTask !== undefined;

  function findColumnIndexByColumnName(columnName: string) {
    const index = board.columns.findIndex(
      (boardColumnName) => boardColumnName === columnName
    );

    if (index === -1) return 0;
    return index;
  }

  function validateSubtaskTitles() {
    const hasEmptyValues =
      taskData.subtaskTitles.filter((columnName) => columnName === "").length >
      0;
    if (hasEmptyValues) {
      return "Please provide a name for each column.";
    }

    return true;
  }

  function changeTaskStatus(newColumnName: string) {
    const taskCopy = { ...taskData };
    taskCopy.columnIndex = findColumnIndexByColumnName(newColumnName);
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

      taskPutMutation.mutate(newTask, { onSuccess: onClose });
    }
  }

  return (
    <Modal
      onClose={onClose}
      header={isEditingTask ? "Edit Task" : "Add New Task"}
    >
      {taskPutMutation.isLoading && (
        <div className="h-52 mb-16 flex items-center justify-center">
          <LoadingSpinner />
        </div>
      )}
      {taskPutMutation.isIdle && (
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
            selected={board.columns[0]}
            options={board.columns}
          />
          <Button variant="primary" size="large" className="mt-3" type="submit">
            {isEditingTask ? "Save Changes" : "Create Task"}
          </Button>
        </Form>
      )}
    </Modal>
  );
}
