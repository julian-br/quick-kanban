import { Task } from "../../api/local-db";
import { useTaskQuery, useTaskMutation } from "../../api/task";
import Modal from "../../components/Modal";
import TaskForm from "./TaskForm";

interface EditTaskModalProps {
  taskId: number;
  onClose: () => void;
}

export default function EditTaskModal({ taskId, onClose }: EditTaskModalProps) {
  const taskQuery = useTaskQuery(taskId);
  const taskMutation = useTaskMutation();

  function handleSubmit(editedTask: Task) {
    taskMutation.put(editedTask).then(onClose);
  }

  return (
    <Modal onClose={onClose} header="Edit Task">
      {taskQuery !== undefined && (
        <TaskForm task={taskQuery} onSubmit={handleSubmit} />
      )}
    </Modal>
  );
}
