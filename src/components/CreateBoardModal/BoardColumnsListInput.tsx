import { useState } from "react";
import CrossIcon from "../../assets/icon-cross.svg";
import Button from "../common/Button";
import InputLabel from "../common/Input/InputLabel";
import TextInput from "../common/Input/TextInput";

interface Props {
  columnValues: string[];
  onColumnValuesChanged: (values: string[]) => void;
}

export function BoardColumnsListInput({
  columnValues,
  onColumnValuesChanged,
}: Props) {
  function addColumnInput() {
    const columnValuesCopy = [...columnValues];
    columnValuesCopy.push("");
    onColumnValuesChanged(columnValuesCopy);
  }

  function removeColumnInput(indexToDelete: number) {
    const columnValuesCopy = [...columnValues];
    columnValuesCopy.splice(indexToDelete, 1);
    onColumnValuesChanged(columnValuesCopy);
  }

  function handleInput(index: number, newValue: string) {
    const columnValuesCopy = [...columnValues];
    columnValuesCopy[index] = newValue;
    onColumnValuesChanged(columnValuesCopy);
  }

  function boardColumnInputValidator(value: string) {
    if (value.length === 0) {
      return "Can't be empty";
    }
    return true;
  }

  return (
    <div>
      <InputLabel className="mt-5">Board Columns</InputLabel>
      <div className="flex flex-col gap-3">
        {columnValues.map((value, index) => (
          <div key={index} className="flex items-center">
            <TextInput
              value={value}
              className="w-full"
              validator={boardColumnInputValidator}
              placeholder="e.g. Web Design"
              onInput={(value) => handleInput(index, value)}
            />
            <Button
              onClick={() => removeColumnInput(index)}
              className="hover:bg-secondary-light ml-2 rounded-lg"
              variant="custom"
            >
              <img src={CrossIcon} className="w-4 mx-2 py-3" />
            </Button>
          </div>
        ))}

        <Button onClick={addColumnInput} variant="secondary">
          <div>
            <span>+</span>
            <span>Add New Column</span>
          </div>
        </Button>
      </div>
    </div>
  );
}