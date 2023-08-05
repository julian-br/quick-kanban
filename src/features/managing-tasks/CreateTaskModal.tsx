import { useTaskMutation } from "../../api/task";
import LoadingSpinner from "../../components/LoadingSpinner";
import Modal from "../../components/Modal";
import TaskForm, { EditedTask } from "./TaskForm";

interface CreateTaskModalProps {
  onClose: () => void;
  boardId: string;
}

export default function CreateTaskModal(props: CreateTaskModalProps) {
  const taskPutMutation = useTaskMutation().put;

  function handleSubmit(editedTask: EditedTask) {
    const newTask = {
      ...editedTask,
      boardId: props.boardId,
    };

    taskPutMutation.mutate(newTask, { onSuccess: props.onClose });
  }

  return (
    <Modal onClose={props.onClose} header="Add New Task">
      {taskPutMutation.isLoading && (
        <div className="h-52 mb-16 flex items-center justify-center">
          <LoadingSpinner />
        </div>
      )}
      {taskPutMutation.isIdle && <TaskForm onSubmit={handleSubmit} />}
    </Modal>
  );
}
