import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  className?: string;
}

export default function Form({
  children,
  onSubmit,
  className: passedClassName,
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
