import { TextareaHTMLAttributes } from "react";
import InputLabel from "./InputLabel";

interface Props
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "onInput"> {
  label?: string;
  errorMessage?: string;
  onInput?: (value: string) => void;
}

export default function TextArea({
  label,
  className: passedClassName,
  onInput,
  errorMessage,
  ...htmlTextAreaProps
}: Props) {
  const isValid = errorMessage === "" || errorMessage === undefined;

  function handleInput(value: string) {
    if (onInput !== undefined) {
      onInput(value);
    }
  }

  return (
    <div className={`${passedClassName ?? ""}`}>
      <InputLabel>{label}</InputLabel>
      <textarea
        {...htmlTextAreaProps}
        onChange={(e) => handleInput(e.target.value)}
        className={`${
          isValid ? "border-gray-200" : "border-danger-500"
        } block w-full rounded-md text-md py-3 placeholder:text-slate-300 focus:border-primary-300 resize-none`}
      />

      {!isValid && (
        <div className="text-danger-500 pointer-events-none bottom-3 absolute right-4">
          {errorMessage}
        </div>
      )}
    </div>
  );
}
