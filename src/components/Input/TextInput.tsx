import { InputHTMLAttributes, useState } from "react";
import InputLabel from "./InputLabel";

interface Props extends Omit<InputHTMLAttributes<HTMLInputElement>, "onInput"> {
  label?: string;
  errorMessage?: string;
  onInput?: (value: string) => void;
}

export default function TextInput({
  label,
  className: passedClassName,
  onInput,
  errorMessage,
  ...htmlInputProps
}: Props) {
  function handleInput(value: string) {
    if (onInput !== undefined) {
      onInput(value);
    }
  }

  const isValid = errorMessage === "" || errorMessage === undefined;

  return (
    <div className={`relative ${passedClassName ?? ""}`}>
      <InputLabel>{label}</InputLabel>
      <input
        {...htmlInputProps}
        onChange={(e) => handleInput(e.target.value)}
        type="text"
        className={`${
          isValid ? "border-none" : "border-danger-400"
        } block w-full text-slate-100 bg-slate-700 rounded-md text-md py-3 placeholder:text-slate-400 focus:border-primary-200`}
      />

      {!isValid && (
        <div className="text-danger-400 pointer-events-none bottom-3 absolute right-4">
          {errorMessage}
        </div>
      )}
    </div>
  );
}
