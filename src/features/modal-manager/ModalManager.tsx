import {
  FunctionComponent,
  ReactNode,
  createContext,
  createElement,
  useContext,
  useRef,
  useState,
} from "react";

const ModalManagerContext = createContext<any>({});

export function useModalManager() {
  const modalManagerContext = useContext(ModalManagerContext);

  return { showModal: modalManagerContext.showModal };
}

type Modals = {
  [key: string]: FunctionComponent<any>;
};

export function ModalManager<T extends Modals>({
  children,
  modals,
}: {
  children: ReactNode;
  modals: T;
}) {
  type ActiveModal = keyof typeof modals | "none";

  const [activeModal, setActiveModal] = useState<ActiveModal>("none");
  const modalData = useRef<any>(null);

  function closeAllModals() {
    setActiveModal("none");
    modalData.current = null;
  }

  return (
    <ModalManagerContext.Provider
      value={{
        activeModal: activeModal,
        showModal: <T extends ActiveModal>(
          modal: T,
          data: Parameters<(typeof modals)[T]>[0]
        ) => {
          setActiveModal(modal);
          modalData.current = data;
        },
      }}
    >
      <h1>
        Modal Manager. Active Modal: {activeModal.toString()} |||| data:
        {JSON.stringify(modalData.current)}
      </h1>
      <div>
        {activeModal !== "none" &&
          createElement(modals[activeModal] as FunctionComponent, {
            ...modalData.current,
            onClose: closeAllModals,
          })}
      </div>
      {children}
    </ModalManagerContext.Provider>
  );
}
