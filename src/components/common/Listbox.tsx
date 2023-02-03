import { Listbox as ListBoxHeadlessUi } from "@headlessui/react";
import { useState } from "react";
import ChivronDownIcon from "../../assets/icon-chevron-down.svg";

interface Props {
  options: string[];
  onChange?: (newValue?: string) => void;
}

export default function Listbox({ options, onChange }: Props) {
  const [selected, setSelected] = useState(options[0]);

  function handleChange(newValue: string) {
    setSelected(newValue);
    if (onChange !== undefined) {
      onChange(newValue);
    }
  }

  return (
    <ListBoxHeadlessUi value={selected} onChange={handleChange}>
      <div className="relative">
        <ListBoxHeadlessUi.Button className="relative px-3 py-2 rounded-lg border-[1.4px] hover:border-primary border-slate-300 w-full ui-open:border-primary">
          <div className="flex justify-between items-center">
            <span>{selected}</span>
            <img src={ChivronDownIcon} />
          </div>
        </ListBoxHeadlessUi.Button>
        <ListBoxHeadlessUi.Options
          className={
            "absolute w-full mt-1 bg-white border-[1.4px] rounded-lg text-slate-500"
          }
        >
          {options.map((option) => (
            <ListBoxHeadlessUi.Option
              key={option}
              className={
                "relative pl-5 py-2 rounded-lg hover:text-primary hover:bg-secondary-light ui-selected:text-primary ui-selected:font-semibold"
              }
              value={option}
            >
              {option}
            </ListBoxHeadlessUi.Option>
          ))}
        </ListBoxHeadlessUi.Options>
      </div>
    </ListBoxHeadlessUi>
  );
}
