import Button from "./common/Button";
import InputLabel from "./common/InputLabel";
import Modal from "./common/Modal";
import TextInput from "./common/TextInput";
import CrossIcon from "../assets/icon-cross.svg";
import { useRef, useState } from "react";
import { generateId } from "../utils/generateId";

function BoardColumnsInputList() {
  const [columnInputs, setColumnInputs] = useState([
    { id: generateId(), value: "" },
  ]);

  function addColumnInput() {
    const id = generateId();
    columnInputs.push({
      id,
      value: "",
    });
    setColumnInputs([...columnInputs]);
  }

  function removeColumnInput(idToDelete: string) {
    const indexToDelete = columnInputs.findIndex(
      (element) => element.id === idToDelete
    );
    columnInputs.splice(indexToDelete, 1);
    setColumnInputs([...columnInputs]);
  }

  function boardColumnInputValidator(value: string) {
    if (value.length === 0) {
      return "a Column Name";
    }
    return true;
  }

  function changeColumnInputValue(id: string, newValue: string) {
    const indexToChange = columnInputs.findIndex(
      (element) => element.id === id
    );
    columnInputs[indexToChange].value = newValue;
    setColumnInputs([...columnInputs]);
  }

  return (
    <div>
      <InputLabel className="mt-5">Board Columns</InputLabel>
      <div className="flex flex-col gap-3">
        {columnInputs.map((columnInput) => (
          <div key={columnInput.id} className="flex items-center">
            <TextInput
              value={columnInput.value}
              className="w-full"
              validator={boardColumnInputValidator}
              placeholder="e.g. Web Design"
              onInput={(value) => changeColumnInputValue(columnInput.id, value)}
            />
            <Button
              onClick={() => removeColumnInput(columnInput.id)}
              className="hover:bg-secondary-light ml-2 rounded-lg"
              variant="custom"
              size="custom"
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

export default function CreateNewBoardModal({
  onClose,
}: {
  onClose: () => void;
}) {
  function nameInputValidator(value: string) {
    if (value.length === 0) {
      return "Can't be empty";
    }

    return true;
  }
  const [testValue, setTestValue] = useState("");

  function handleSubmit(e: any) {
    e.preventDefault();
    console.log(testValue);
  }

  return (
    <Modal title="Add New Board" onClose={onClose}>
      <form onSubmit={handleSubmit} className="mt-7">
        <TextInput
          value={testValue}
          onInput={(value) => setTestValue(value)}
          label="Board Name"
          validator={nameInputValidator}
          placeholder="e.g. Web Design"
        />

        <BoardColumnsInputList />
        <Button type="submit" className="w-full mt-7 mb-3" variant="primary">
          Create New Board
        </Button>
      </form>
    </Modal>
  );
}
