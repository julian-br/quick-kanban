import { KanbanTaskData } from "../../api/kanbanBoard";
import Listbox from "../common/Input/Listbox";
import Modal from "../common/Modal";
import SubtaskList from "./SubtaskList";

interface Props {
  task: KanbanTaskData;
}

export default function ViewTaskModal({ task }: Props) {
  return (
    <Modal onClose={() => null} title={task.title}>
      <div className="w-full mt-7">
        <p className="text-slate-500 mb-5">{task.description}</p>
        <SubtaskList subtasks={task.subtasks} />
        <div>
          <h5 className="text-slate-500 font-medium mt-5">Current Status</h5>
          <Listbox selected="Doing" options={["Todo", "Doing", "Done"]} />
        </div>
      </div>
    </Modal>
  );
}
