import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onChange?: () => void;
}

export default function Form({
  children,
  className: passedClassName,
  onSubmit,
  onChange,
}: Props) {
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSubmit(event);
  }

  function handleChange() {
    if (onChange !== undefined) {
      onChange();
    }
  }

  return (
    <form
      onChange={handleChange}
      className={passedClassName ?? ""}
      onSubmit={handleSubmit}
    >
      {children}
    </form>
  );
}
