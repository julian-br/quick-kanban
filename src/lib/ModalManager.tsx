import {
  FunctionComponent,
  ReactNode,
  createContext,
  createElement,
  useContext,
  useRef,
  useState,
} from "react";
import { Optional } from "../utils/utilityTypes";

type RequiredModalParams = {
  onClose: () => void;
};

type PassedModalComponent<OptionalModalProps> = FunctionComponent<
  OptionalModalProps & RequiredModalParams
>;

type Modals = {
  [key: string]: PassedModalComponent<any>;
};

export function createModalManager<TPassedModals extends Modals>(
  modals: TPassedModals
) {
  type AvailableModalKeys = keyof typeof modals | "none";

  type ModalManagerContext = {
    activeModal: AvailableModalKeys;
    showModal: <TActiveModal extends AvailableModalKeys>(
      modal: TActiveModal,
      data?: Optional<Parameters<(typeof modals)[TActiveModal]>[0], "onClose">
    ) => void;
  };

  const ModalManagerContext = createContext<ModalManagerContext>(
    {} as ModalManagerContext
  );

  function useModalManager() {
    const modalManagerContext = useContext(ModalManagerContext);
    return { showModal: modalManagerContext.showModal };
  }

  function ModalManagerProvider({ children }: { children: ReactNode }) {
    const [activeModal, setActiveModal] = useState<AvailableModalKeys>("none");
    const modalData = useRef<any>(null);

    function closeAllModals() {
      setActiveModal("none");
      modalData.current = null;
    }

    return (
      <ModalManagerContext.Provider
        value={{
          activeModal: activeModal,
          showModal: <TActiveModal extends AvailableModalKeys>(
            modal: TActiveModal,
            data: Parameters<(typeof modals)[TActiveModal]>[0]
          ) => {
            setActiveModal(modal);
            modalData.current = data;
          },
        }}
      >
        <div>
          {activeModal !== "none" &&
            createElement(modals[activeModal] as any, {
              ...modalData.current,
              onClose: closeAllModals,
            })}
        </div>
        {children}
      </ModalManagerContext.Provider>
    );
  }

  return { useModalManager, ModalManagerProvider };
}
