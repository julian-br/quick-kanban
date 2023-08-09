import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export default function Form({
  children,
  className: passedClassName,
  onSubmit,
}: Props) {
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSubmit(event);
  }

  return (
    <form className={passedClassName ?? ""} onSubmit={handleSubmit}>
      {children}
    </form>
  );
}
