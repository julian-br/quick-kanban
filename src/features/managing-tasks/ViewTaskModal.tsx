import { useRef, useState } from "react";
import { Subtask, Task, useTaskMutation } from "../../api/task";
import Listbox from "../../components/Input/Listbox";
import Modal from "../../components/Modal";
import SubtaskList from "./SubtaskList";
import LoadingSpinner from "../../components/LoadingSpinner";
import ContextMenu from "../../components/ContextMenu";
import { useKanbanBoard } from "../../api/kanbanBoard";

interface Props {
  task: Task;
  onClose: () => void;
}

export default function ViewTaskModal({ task, onClose }: Props) {
  const [taskData, setTaskData] = useState(task);
  const taskPutMutation = useTaskMutation().put;
  const taskIsModified = useRef(false);
  const kanbanBoardColumns = useKanbanBoard(taskData.boardId).data!.columns;

  function toggleSubtaskStatus(clickedSubtask: Subtask) {
    taskIsModified.current = true;
    taskData.subtasks.map((subtask) => {
      if (clickedSubtask.title === subtask.title) {
        subtask.isCompleted = !subtask.isCompleted;
      }
    });
    setTaskData({ ...taskData });
  }

  function changeTaskStatus(newStatus: string) {
    taskIsModified.current = true;
    const statusColumnIndex = kanbanBoardColumns.findIndex(
      (columnName) => columnName === newStatus
    );

    if (statusColumnIndex === -1) return;
    setTaskData({ ...taskData, columnIndex: statusColumnIndex });
  }

  function handleModalClose() {
    if (taskIsModified.current === false) {
      onClose();
      return;
    }
    taskPutMutation.mutate(taskData, { onSuccess: onClose });
  }

  return (
    <Modal
      onClose={handleModalClose}
      header={
        <div className="flex justify-between items-center">
          <h3>{task.title}</h3>
          <ContextMenu>
            <ContextMenu.Entry onClick={() => null}>
              Edit Task
            </ContextMenu.Entry>
            <ContextMenu.Entry onClick={() => null}>
              <span className="text-danger-400">Delete Task</span>
            </ContextMenu.Entry>
          </ContextMenu>
        </div>
      }
    >
      {taskPutMutation.isLoading && (
        <div className="h-72 flex justify-center pt-20">
          <LoadingSpinner />
        </div>
      )}
      {taskPutMutation.isIdle && (
        <div className="w-full flex flex-col gap-6 mb-3">
          <p className="text-slate-300">{task.description}</p>
          <SubtaskList
            onSubtaskClick={toggleSubtaskStatus}
            subtasks={task.subtasks}
          />
          <div>
            <Listbox
              label="Current Status"
              onChange={changeTaskStatus}
              selected={kanbanBoardColumns[taskData.columnIndex]}
              options={kanbanBoardColumns}
            />
          </div>
        </div>
      )}
    </Modal>
  );
}
