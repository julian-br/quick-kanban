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
  const taskPutMutation = useTaskMutation().put;

  function handleSubmit(newTaskData: EditedTask) {
    if (!taskQuery.isSuccess) {
      return;
    }

    const editedTask = {
      ...newTaskData,
      id: taskQuery.data.id,
      boardId: taskQuery.data.boardId,
    };

    taskPutMutation.mutate(editedTask, { onSuccess: props.onClose });
  }

  return (
    <Modal onClose={props.onClose} header="Edit Task">
      {taskPutMutation.isLoading && (
        <div className="h-52 mb-16 flex items-center justify-center">
          <LoadingSpinner />
        </div>
      )}
      {taskPutMutation.isIdle && taskQuery.isSuccess && (
        <TaskForm task={taskQuery.data} onSubmit={handleSubmit} />
      )}
    </Modal>
  );
}
