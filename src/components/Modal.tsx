import {
  Fragment,
  MutableRefObject,
  ReactNode,
  Ref,
  useEffect,
  useState,
} from "react";
import { Dialog, Transition } from "@headlessui/react";

interface ModalProps {
  title?: string;
  header: ReactNode;
  children: ReactNode;
  onClose: () => void;
  initialFocus?: MutableRefObject<HTMLElement | null>;
}

export default function Modal({
  children,
  onClose,
  header,
  initialFocus,
}: ModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  // show transition on open
  useEffect(() => {
    setIsOpen(true);
  }, []);

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        initialFocus={initialFocus}
        as="div"
        className="relative z-40"
        static
        onClose={onClose}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-75"
          enterFrom="opacity-0"
          enterTo="opacity-100"
        >
          <div className="fixed inset-0 bg-black/30 transition-opacity backdrop-blur-md" />
        </Transition.Child>

        <Transition.Child
          as={Fragment}
          enter="ease-in duration-75"
          enterFrom="scale-75 opacity-0"
          enterTo="opacity-100 scale-100"
        >
          <div className="fixed inset-0 left overflow-y-auto">
            <div className="relative flex h-full justify-center text-center items-center">
              <Dialog.Panel className="relative h-fit rounded-lg px-9 pb-12 mx-3 pt-8 bg-slate-900 border border-slate-700/70 w-full md:w-[40rem]">
                <Dialog.Title className="text-xl text-left font-bold leading-6 mb-2 text-slate-100">
                  {header}
                </Dialog.Title>
                <div className="text-left">{children}</div>
              </Dialog.Panel>
            </div>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
}
