import { useKanbanBoard } from "../../api/kanbanBoard";
import { Task, useTaskMutation } from "../../api/task";
import LoadingSpinner from "../../components/LoadingSpinner";
import Modal from "../../components/Modal";
import TaskForm, { EditedTask } from "./TaskForm";

interface CreateOrEditTaskModalProps {
  onClose: () => void;
  task?: Task;
  boardId: string;
}

export default function CreateOrEditTaskModal({
  onClose,
  task,
  boardId,
}: CreateOrEditTaskModalProps) {
  const taskPutMutation = useTaskMutation().put;

  const isEditingTask = task !== undefined;
  const board = useKanbanBoard(boardId);

  function handleSubmit(editedTask: EditedTask) {
    const newTask = {
      ...editedTask,
      boardId: boardId,
    };

    taskPutMutation.mutate(newTask, { onSuccess: onClose });
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
      {taskPutMutation.isIdle && board.isSuccess && (
        <TaskForm task={task} onSubmit={handleSubmit} />
      )}
    </Modal>
  );
}
