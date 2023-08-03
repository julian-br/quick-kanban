import CreateBoardModal from "./features/managing-boards/CreateBoardModal";
import DeleteBoardModal from "./features/managing-boards/DeleteBoardModal";
import ViewTaskModal from "./features/managing-tasks/ViewTaskModal";
import { createModalManager } from "./lib/ModalManager";

const appModals = {
  createBoardModal: CreateBoardModal,
  viewTaskModal: ViewTaskModal,
  deleteBoardModal: DeleteBoardModal,
};

const appModalManager = createModalManager(appModals);

export const AppModalManagerProvider = appModalManager.ModalManagerProvider;
export const useAppModalManager = appModalManager.useModalManager;
