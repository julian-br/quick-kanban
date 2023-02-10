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
    const valuesCopy = [...values];
    valuesCopy.splice(indexToDelete, 1);
    onChange(valuesCopy);
  }

  function updateValue(indexToUpdate: number, newValue: string) {
    const valuesCopy = [...values];
    valuesCopy[indexToUpdate] = newValue;
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
              onInput={(value) => updateValue(index, value)}
            />
            <RemoveInputFieldButton onClick={() => removeInputField(index)} />
          </div>
        ))}
        <div className="text-danger">{errorMessage}</div>
        <AddInputFieldButton text={addButtonText} onClick={addInputField} />
      </div>
    </div>
  );
}

function RemoveInputFieldButton({ onClick }: { onClick: () => void }) {
  return (
    <Button
      onClick={onClick}
      className="hover:bg-secondary-light ml-2 rounded-lg"
      variant="custom"
    >
      <img src={CrossIcon} className="w-4 mx-2 py-3" />
    </Button>
  );
}

function AddInputFieldButton({
  onClick,
  text,
}: {
  onClick: () => void;
  text: string;
}) {
  return (
    <Button onClick={onClick} variant="secondary">
      <div>
        <span>+</span>
        <span>{text}</span>
      </div>
    </Button>
  );
}