import { useTaskQuery, useTaskMutation } from "../../api/task";
import { Task } from "../../api/types";
import LoadingSpinner from "../../components/LoadingSpinner";
import Modal from "../../components/Modal";
import TaskForm from "./TaskForm";

interface EditTaskModalProps {
  taskId: string;
  onClose: () => void;
}

export default function EditTaskModal(props: EditTaskModalProps) {
  const taskQuery = useTaskQuery(props.taskId);
  const taskUpdateMutation = useTaskMutation().put;

  function handleSubmit(editedTask: Task) {
    taskUpdateMutation.mutate(editedTask, { onSuccess: props.onClose });
  }

  return (
    <Modal onClose={props.onClose} header="Edit Task">
      {taskUpdateMutation.isLoading && (
        <div className="h-52 mb-16 flex items-center justify-center">
          <LoadingSpinner />
        </div>
      )}
      {taskUpdateMutation.isIdle && taskQuery.isSuccess && (
        <TaskForm task={taskQuery.data} onSubmit={handleSubmit} />
      )}
    </Modal>
  );
}
