import CreateBoardModal from "./features/managing-boards/CreateBoardModal";
import ViewTaskModal from "./features/managing-tasks/ViewTaskModal";
import { createModalManager } from "./lib/ModalManager";

const appModals = {
  createBoardModal: CreateBoardModal,
  viewTaskModal: ViewTaskModal,
};

const appModalManager = createModalManager(appModals);

export const AppModalManagerProvider = appModalManager.ModalManagerProvider;
export const useAppModalManager = appModalManager.useModalManager;
