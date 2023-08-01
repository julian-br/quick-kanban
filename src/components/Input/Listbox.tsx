import { Listbox as ListBoxHeadlessUi } from "@headlessui/react";
import InputLabel from "./InputLabel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

interface Props {
  label?: string;
  options: string[];
  selected?: string;
  onChange?: (newValue: string) => void;
}

export default function Listbox({ options, onChange, selected, label }: Props) {
  function handleChange(newValue: string) {
    if (onChange !== undefined) {
      onChange(newValue);
    }
  }

  return (
    <ListBoxHeadlessUi value={selected} onChange={handleChange}>
      <div className="relative overflow-visible">
        <InputLabel>{label}</InputLabel>
        <ListBoxHeadlessUi.Button className="relative  px-3 py-2 rounded-lg  bg-slate-700 hover:border-primary-400 border border-slate-600  w-full">
          <div className="flex justify-between items-center">
            <span className="block truncate text-slate-100">{selected}</span>
            <FontAwesomeIcon
              icon={faChevronDown}
              className="h-3 text-slate-200"
            ></FontAwesomeIcon>
          </div>
        </ListBoxHeadlessUi.Button>
        <ListBoxHeadlessUi.Options className="absolute max-h-60 w-full overflow-auto mt-1 bg-slate-700  rounded-lg text-slate-300 z-50">
          {options.map((option) => (
            <ListBoxHeadlessUi.Option
              key={option}
              className={
                "cursor-pointer pl-5 py-2 rounded-lg hover:text-primary-300 hover:bg-slate-600 ui-selected:text-primary-400 ui-selected:font-bold"
              }
              value={option}
            >
              <span className="block truncate">{option}</span>
            </ListBoxHeadlessUi.Option>
          ))}
        </ListBoxHeadlessUi.Options>
      </div>
    </ListBoxHeadlessUi>
  );
}
