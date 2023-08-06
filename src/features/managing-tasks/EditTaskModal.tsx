import { Task, useTask, useTaskMutation } from "../../api/task";
import LoadingSpinner from "../../components/LoadingSpinner";
import Modal from "../../components/Modal";
import TaskForm, { EditedTask } from "./TaskForm";

interface EditTaskModalProps {
  taskId: string;
  onClose: () => void;
}

export default function EditTaskModal(props: EditTaskModalProps) {
  const taskQuery = useTask(props.taskId);
  const taskUpdateMutation = useTaskMutation().update;

  function handleSubmit(editedTaskData: EditedTask) {
    if (!taskQuery.isSuccess) {
      return;
    }

    const editedTask: Task = {
      ...taskQuery.data,
      title: editedTaskData.title,
      description: editedTaskData.description,
      subtasks: editedTaskData.subtasks,
    };

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
