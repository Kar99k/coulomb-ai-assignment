import { LABEL_TO_HOURLY_METRICS } from "@/lib/constants";
import { useState } from "react";

type MultiSelectDropdownProps<T extends string> = {
  options: T[];
  selected: T[];
  onSelect: (val: T[]) => void;
  maxSelect?: number;
};

function MultiSelectDropdown<T extends string>({
  options,
  selected,
  onSelect,
  maxSelect = 2,
}: MultiSelectDropdownProps<T>) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (value: T) => {
  const isSelected = selected.includes(value);

  if (isSelected) {
    if (selected.length === 1) return;

    onSelect(selected.filter((item) => item !== value));
  } else if (selected.length < maxSelect) {
    onSelect([...selected, value]);
  }
};

  const displayLabel =
    selected.length === 0 ? "Select up to 2" : selected.join(", ");

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex justify-between w-64 px-4 py-2 text-sm font-medium bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
      >
        <span className="truncate">{displayLabel}</span>
        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d={isOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
          />
        </svg>
      </button>

      {isOpen && (
        <ul className="absolute z-10 mt-2 w-64 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto">
          {options.map((option) => {
            const isChecked = selected.includes(option);
            const disabled = !isChecked && selected.length >= maxSelect;

            return (
              <li
                key={option}
                onClick={() => !disabled && handleSelect(option)}
                className={`flex items-center px-4 py-2 text-sm cursor-pointer ${
                  disabled ? "text-gray-400 cursor-not-allowed" : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <input
                  type="radio"
                  checked={isChecked}
                  readOnly
                  className="mr-2"
                  disabled={disabled}
                />
                {option}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default MultiSelectDropdown;
