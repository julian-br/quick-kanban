import Button from "./common/Button";
import InputLabel from "./common/InputLabel";
import Modal from "./common/Modal";
import TextInput from "./common/TextInput";
import CrossIcon from "../assets/icon-cross.svg";

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

  return (
    <Modal title="Add New Board" onClose={onClose}>
      <form className="mt-7">
        <TextInput
          label="Board Name"
          validator={nameInputValidator}
          placeholder="e.g. Web Design"
        />

        <InputLabel className="mt-5">Board Columns</InputLabel>
        <div className="flex flex-col gap-3">
          <div className="flex items-center">
            <TextInput
              className="w-full"
              validator={nameInputValidator}
              placeholder="e.g. Web Design"
            />
            <Button
              className="hover:bg-secondary-light ml-2 rounded-lg"
              variant="custom"
              size="custom"
            >
              <img src={CrossIcon} className="w-4 mx-2 py-3" />
            </Button>
          </div>

          <div className="flex items-center">
            <TextInput
              className="w-full"
              validator={nameInputValidator}
              placeholder="e.g. Web Design"
            />
            <Button
              className="hover:bg-secondary-light ml-2 rounded-lg"
              variant="custom"
              size="custom"
            >
              <img src={CrossIcon} className="w-4 mx-2 py-3" />
            </Button>
          </div>

          <Button variant="secondary">
            <div>
              <span>+</span>
              <span>Add New Column</span>
            </div>
          </Button>
        </div>

        <Button className="w-full mt-7 mb-3" variant="primary">
          Create New Board
        </Button>
      </form>
    </Modal>
  );
}
