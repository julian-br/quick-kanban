import Button from "../Button";
import InputLabel from "./InputLabel";
import TextInput from "./TextInput";
import CrossIcon from "../../../assets/icon-cross.svg";

interface Props {
  values: string[];
  label?: string;
  addButtonText: string;
  inputPlaceHolder?: string;
  onChange: (values: string[]) => void;
  errorMessage?: string;
}

export default function ListInput({
  values,
  label,
  addButtonText,
  inputPlaceHolder,
  onChange,
  errorMessage,
}: Props) {
  function addInputField() {
    onChange([...values, ""]);
  }

  function removeInputField(indexToDelete: number) {
    const valuesCopy = [...values].splice(indexToDelete, 1);
    valuesCopy.splice(indexToDelete, 1);
    onChange(valuesCopy);
  }

  function handleInput(index: number, newValue: string) {
    const valuesCopy = [...values];
    valuesCopy[index] = newValue;
    onChange(valuesCopy);
  }

  return (
    <div>
      <InputLabel>{label}</InputLabel>
      <div className="flex flex-col gap-2">
        {values.map((value, index) => (
          <div key={index} className="flex items-center">
            <TextInput
              value={value}
              className="w-full"
              placeholder={inputPlaceHolder}
              onInput={(value) => handleInput(index, value)}
            />
            <Button
              onClick={() => removeInputField(index)}
              className="hover:bg-secondary-light ml-2 rounded-lg"
              variant="custom"
            >
              <img src={CrossIcon} className="w-4 mx-2 py-3" />
            </Button>
          </div>
        ))}

        <div className="text-danger">{errorMessage}</div>
        <Button onClick={addInputField} variant="secondary">
          <div>
            <span>+</span>
            <span>{addButtonText}</span>
          </div>
        </Button>
      </div>
    </div>
  );
}
