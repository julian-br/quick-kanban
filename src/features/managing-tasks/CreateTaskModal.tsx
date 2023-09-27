import { useTaskMutation } from "../../api/task";
import Modal from "../../components/Modal";
import TaskForm, { CreatedTask } from "./TaskForm";

interface CreateTaskModalProps {
  onClose: () => void;
  boardId: number;
}

export default function CreateTaskModal({
  boardId,
  onClose,
}: CreateTaskModalProps) {
  const taskMutation = useTaskMutation();

  function handleSubmit(createdTask: CreatedTask) {
    taskMutation.post(createdTask, boardId).then(onClose);
  }

  return (
    <Modal onClose={onClose} header="Add New Task">
      <TaskForm onSubmit={handleSubmit} />
    </Modal>
  );
}
