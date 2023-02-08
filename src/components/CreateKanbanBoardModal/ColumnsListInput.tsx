import { useState } from "react";
import CrossIcon from "../../assets/icon-cross.svg";
import Button from "../common/Button";
import InputLabel from "../common/Input/InputLabel";
import TextInput from "../common/Input/TextInput";

interface Props {
  columnValues: string[];
  onColumnValuesChange: (values: string[]) => void;
  errorMessage?: string;
}

export function BoardColumnsListInput({
  columnValues,
  onColumnValuesChange,
  errorMessage,
}: Props) {
  function addColumnInput() {
    const columnValuesCopy = [...columnValues];
    columnValuesCopy.push("");
    onColumnValuesChange(columnValuesCopy);
  }

  function removeColumnInput(indexToDelete: number) {
    const columnValuesCopy = [...columnValues];
    columnValuesCopy.splice(indexToDelete, 1);
    onColumnValuesChange(columnValuesCopy);
  }

  function handleInput(index: number, newValue: string) {
    const columnValuesCopy = [...columnValues];
    columnValuesCopy[index] = newValue;
    onColumnValuesChange(columnValuesCopy);
  }

  return (
    <div>
      <InputLabel>Board Columns</InputLabel>
      <div className="flex flex-col gap-3">
        {columnValues.map((value, index) => (
          <div key={index} className="flex items-center">
            <TextInput
              value={value}
              className="w-full"
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

        <div className="text-danger">{errorMessage}</div>
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
