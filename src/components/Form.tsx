import { ReactNode, useState } from "react";

interface Schema {
  [key: string]: () => string | true;
}

export function useFormValidation<T extends Schema>(schema: T) {
  type errors = {
    [Property in keyof typeof schema]: string;
  };

  const [formErrors, setFormErrors] = useState<errors>(
    getInititalErrorMessages()
  );

  function getInititalErrorMessages() {
    const constructedErrors: any = {};
    for (const key in schema) {
      constructedErrors[key] = "";
    }

    return constructedErrors as errors;
  }

  function validateForm() {
    const constructedErrors: any = {};
    let formIsValid = true;

    for (const key in schema) {
      const validationResult = schema[key]();
      if (validationResult !== true) {
        formIsValid = false;
        constructedErrors[key] = validationResult;
      }
    }

    setFormErrors(constructedErrors as errors);
    return formIsValid;
  }
  return { formErrors, validateForm };
}

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
