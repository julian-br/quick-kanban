import { Task } from "../../api/local-db";
import { useTaskMutation, useTaskQuery } from "../../api/task";
import Modal from "../../components/Modal";
import TaskForm from "./TaskForm";

interface EditTaskModalProps {
  taskId: number;
  onClose: () => void;
}

export default function EditTaskModal({ taskId, onClose }: EditTaskModalProps) {
  const task = useTaskQuery(taskId);
  const taskMutation = useTaskMutation();

  function handleSubmit(editedTask: Task) {
    taskMutation.put(editedTask).then(onClose);
  }

  return (
    <Modal onClose={onClose} header="Edit Task">
      {task !== undefined && <TaskForm task={task} onSubmit={handleSubmit} />}
    </Modal>
  );
}
