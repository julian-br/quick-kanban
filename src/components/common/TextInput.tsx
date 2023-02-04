import { InputHTMLAttributes, useState } from "react";
import InputLabel from "./InputLabel";

interface Props extends Omit<InputHTMLAttributes<HTMLInputElement>, "onInput"> {
  label?: string;
  validator?: (value: string) => true | string;
  onInput?: (value: string) => void;
}

export default function TextInput({
  label,
  className: passedClassName,
  onInput,
  validator,
  ...htmlInputProps
}: Props) {
  const [errorMessage, setErrorMessage] = useState("");

  function handleInput(value: string) {
    if (onInput !== undefined) {
      onInput(value);
    }

    if (validator !== undefined) {
      const validationResult = validator(value);

      if (validationResult !== true) {
        setErrorMessage(validationResult);
      } else {
        setErrorMessage("");
      }
    }
  }

  const isValid = errorMessage === "";

  return (
    <div className={`relative ${passedClassName ?? ""}`}>
      <InputLabel>{label}</InputLabel>
      <div>
        <input
          {...htmlInputProps}
          onChange={(e) => handleInput(e.target.value)}
          type="text"
          className={`${
            isValid ? "border-gray-200" : "border-danger"
          } block w-full rounded-md text-md py-3 placeholder:text-slate-300 focus:border-primary-light`}
          data-is-valid={isValid ? true : false}
        />
      </div>

      {!isValid && (
        <div className="text-red-500 pointer-events-none absolute top-10 right-4">
          {errorMessage}
        </div>
      )}
    </div>
  );
}
