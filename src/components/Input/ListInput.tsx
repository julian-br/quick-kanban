import Button from "../Button";
import InputLabel from "./InputLabel";
import TextInput from "./TextInput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

interface Props {
  values: string[];
  label?: string;
  addButtonText: string;
  inputPlaceHolder?: string;
  onEdit: (values: string[]) => void;
  onAdd: () => void;
  onDelete: (value: string, index: number) => void;
  errorMessage?: string;
  className?: string;
}

export default function ListInput({
  values,
  label,
  addButtonText,
  inputPlaceHolder,
  onEdit,
  onAdd,
  onDelete,
  errorMessage,
  className,
}: Props) {
  function addInputField() {
    onAdd();
  }

  function removeInputField(value: string, indexToDelete: number) {
    onDelete(value, indexToDelete);
  }

  function updateValue(indexToUpdate: number, newValue: string) {
    const valuesCopy = [...values];
    valuesCopy[indexToUpdate] = newValue;
    onEdit(valuesCopy);
  }

  return (
    <div className={className}>
      <InputLabel>{label}</InputLabel>
      <div className="text-danger-400">{errorMessage}</div>
      <div className="flex flex-col gap-2">
        {values.map((value, index) => (
          <div key={index} className="flex items-center">
            <TextInput
              value={value}
              className="w-full h-full"
              placeholder={inputPlaceHolder}
              onInput={(value) => updateValue(index, value)}
            />
            <RemoveInputFieldButton
              onClick={() => removeInputField(value, index)}
            />
          </div>
        ))}
        <AddInputFieldButton text={addButtonText} onClick={addInputField} />
      </div>
    </div>
  );
}

function RemoveInputFieldButton({ onClick }: { onClick: () => void }) {
  return (
    <Button
      onClick={onClick}
      className=" ml-1 rounded-lg h-full w-8 mt-1 group"
      variant="custom"
    >
      <FontAwesomeIcon
        icon={faXmark}
        className="text-slate-400 h-7 group-hover:text-primary-400"
      />
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
    <Button className="mt-2" onClick={onClick} variant="secondary">
      <div>
        <span>+</span>
        <span>{text}</span>
      </div>
    </Button>
  );
}
