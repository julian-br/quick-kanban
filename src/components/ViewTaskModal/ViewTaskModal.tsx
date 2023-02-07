import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import {
  kanbanBoardKey,
  KanbanSubtaskData,
  KanbanTaskData,
  updateTask,
} from "../../api/kanbanBoard";
import Listbox from "../common/Input/Listbox";
import Modal from "../common/Modal";
import SubtaskList from "./SubtaskList";

interface Props {
  boardId: string;
  task: KanbanTaskData;
  boardColumns: string[];
  onClose: () => void;
}

export default function ViewTaskModal({
  boardId,
  task,
  onClose,
  boardColumns,
}: Props) {
  const [taskData, setTaskData] = useState(task);
  const queryClient = useQueryClient();
  const taskMutation = useMutation(() => updateTask(taskData), {
    onSuccess: () => {
      queryClient.invalidateQueries(kanbanBoardKey(boardId));
      onClose();
    },
  });

  function toggleSubtaskIsCompleted(subtaskToChange: KanbanSubtaskData) {
    const modifiedSubstaskIndex = taskData.subtasks.findIndex(
      (subtask) => subtask.title === subtaskToChange.title
    )!;

    const modifiedSubtask = {
      title: subtaskToChange.title,
      isCompleted: !subtaskToChange.isCompleted,
    };

    const taskDataCopy = { ...taskData };
    taskDataCopy.subtasks[modifiedSubstaskIndex] = modifiedSubtask;
    setTaskData(taskDataCopy);
  }

  function changeTaskStatus(newStatus: string) {
    const taskCopy = { ...taskData };
    taskCopy.status = newStatus;
    setTaskData(taskCopy);
  }

  function handleModalClose() {
    taskMutation.mutate();
  }

  return (
    <Modal onClose={handleModalClose} title={task.title}>
      <div className="w-full mt-7">
        <p className="text-slate-500 mb-5">{task.description}</p>
        <SubtaskList
          onSubtaskClick={toggleSubtaskIsCompleted}
          subtasks={task.subtasks}
        />
        <div>
          <h5 className="text-slate-500 font-medium mt-5">Current Status</h5>
          <Listbox
            onChange={changeTaskStatus}
            selected={taskData.status}
            options={boardColumns}
          />
        </div>
      </div>
    </Modal>
  );
}
