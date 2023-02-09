import { Listbox as ListBoxHeadlessUi } from "@headlessui/react";
import ChivronDownIcon from "../../../assets/icon-chevron-down.svg";
import InputLabel from "./InputLabel";

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
        <ListBoxHeadlessUi.Button className="relative px-3 py-2 rounded-lg border hover:border-primary border-slate-300 w-full">
          <div className="flex justify-between items-center">
            <span className="block truncate">{selected}</span>
            <img src={ChivronDownIcon} />
          </div>
        </ListBoxHeadlessUi.Button>
        <ListBoxHeadlessUi.Options className="absolute max-h-60 w-full overflow-auto mt-1 bg-white border rounded-lg text-slate-500 z-50">
          {options.map((option) => (
            <ListBoxHeadlessUi.Option
              key={option}
              className={
                "realtive cursor-pointer pl-5 py-2 rounded-lg hover:text-primary hover:bg-secondary-light ui-selected:text-primary ui-selected:font-semibold"
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
