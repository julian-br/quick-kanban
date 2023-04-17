import { Fragment, ReactNode } from "react";
import { Dialog, Transition } from "@headlessui/react";

interface Props {
  title?: string;
  children: ReactNode;
  onClose: () => void;
}

export default function Modal({ children, onClose, title }: Props) {
  return (
    <Transition.Root show={true} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 transition-opacity backdrop-blur-sm" />

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="relative flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Dialog.Panel className="font-jakarta opacity-100 relative rounded-lg px-9 py-7 bg-slate-700 shadow-xl transition-all min-w-[35em] min-h-[15em] max-w-min">
              <Dialog.Title
                as="h3"
                className="text-xl text-left font-bold leading-6 mb-2 text-slate-100"
              >
                {title}
              </Dialog.Title>
              <div className="text-left static">{children}</div>
            </Dialog.Panel>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
