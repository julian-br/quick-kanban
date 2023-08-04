import CreateBoardModal from "./features/managing-boards/CreateBoardModal";
import DeleteBoardModal from "./features/managing-boards/DeleteBoardModal";
import EditBoardModal from "./features/managing-boards/EditBoardModal";
import CreateTaskModal from "./features/managing-tasks/CreateTaskModal";
import DeleteTaskModal from "./features/managing-tasks/DeleteTaskModal";
import EditTaskModal from "./features/managing-tasks/EditTaskModal";
import ViewTaskModal from "./features/managing-tasks/ViewTaskModal";
import { createModalManager } from "./lib/ModalManager";

const appModals = {
  createBoardModal: CreateBoardModal,
  viewTaskModal: ViewTaskModal,
  deleteBoardModal: DeleteBoardModal,
  editBoardModal: EditBoardModal,
  deleteTaskModal: DeleteTaskModal,
  createTaskModal: CreateTaskModal,
  editTaskModal: EditTaskModal,
};

const appModalManager = createModalManager(appModals);

export const AppModalManagerProvider = appModalManager.ModalManagerProvider;
export const useAppModalManager = appModalManager.useModalManager;
