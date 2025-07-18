import { useState } from "react";

type DropdownProps<T> = {
  options: T[];
  selected: T;
  onSelect: (val: T) => void;
};

function Dropdown<T extends string>({ options, selected, onSelect }: DropdownProps<T>) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="inline-flex justify-between w-48 px-4 py-2 text-sm font-medium bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
      >
        {selected}
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
        <ul className="absolute z-10 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto">
          {options.map((option) => (
            <li
              key={option}
              onClick={() => {
                onSelect(option);
                setIsOpen(false);
              }}
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
            >
              <input
                type="radio"
                name="dropdown-option"
                checked={option === selected}
                readOnly
                className="mr-2"
              />
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Dropdown;
