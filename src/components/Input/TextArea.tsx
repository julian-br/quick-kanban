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
          isValid ? "border-slate-700" : "border-danger-500"
        } block w-full text-slate-100 rounded-md text-md bg-slate-700 py-3 placeholder:text-slate-400 focus:border-primary-600 resize-none`}
      />

      {!isValid && (
        <div className="text-danger-500 pointer-events-none bottom-3 absolute right-4">
          {errorMessage}
        </div>
      )}
    </div>
  );
}
