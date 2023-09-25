import { Task } from "../../api/local-db";
import { useTaskMutation } from "../../api/task";
import Modal from "../../components/Modal";
import TaskForm from "./TaskForm";

interface EditTaskModalProps {
  task: Task;
  onClose: () => void;
}

export default function EditTaskModal({ task, onClose }: EditTaskModalProps) {
  const taskMutation = useTaskMutation();

  function handleSubmit(editedTask: Task) {
    taskMutation.put(editedTask).then(onClose);
  }

  return (
    <Modal onClose={onClose} header="Edit Task">
      <TaskForm task={task} onSubmit={handleSubmit} />
    </Modal>
  );
}
