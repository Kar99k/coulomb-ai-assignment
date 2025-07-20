import { useEffect, useRef, useState } from "react";
import Button from "../atoms/Button";
import { Check, ChevronDown } from "lucide-react";

type MultiSelectDropdownProps<T extends string> = {
  options: T[];
  selected: T[];
  onSelect: (val: T[]) => void;
  maxSelect?: number;
  getLabel?: (val: T) => string;
};

export default function MultiSelectDropdown<T extends string>({
  options,
  selected,
  onSelect,
  maxSelect = 2,
  getLabel = (val) => val
}: MultiSelectDropdownProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (value: T) => {
    const isSelected = selected.includes(value);
    if (isSelected && selected.length > 1) {
      onSelect(selected.filter((item) => item !== value));
    } else if (!isSelected && selected.length < maxSelect) {
      onSelect([...selected, value]);
    }
  };

  const displayLabel = selected.map(getLabel).join(", ") || `Select up to ${maxSelect}`;

  return (
    <div ref={dropdownRef} className="relative text-left ">
      <Button
        size="lg"
        onClick={() => setIsOpen(!isOpen)}
        iconPosition="end"
        className="min-w-40"
        icon={<ChevronDown className='text-primary size-4'/>}
      >
        <span className="truncate">{displayLabel}</span>
      </Button>

      {isOpen && (
        <ul className="absolute z-10 mt-2 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto w-full">
          {options.map((option) => {
            const isChecked = selected.includes(option);
            const disabled = !isChecked && selected.length >= maxSelect;
            return (
              <li
                  key={option}
                  onClick={() => !disabled && handleSelect(option)}
                  className={`flex items-center justify-between px-4 py-2 text-sm cursor-pointer ${
                    disabled
                      ? "text-gray-400 cursor-not-allowed"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <span className="flex items-center">
                    {getLabel(option)}
                  </span>
                  {isChecked && <Check className="text-primary w-4 h-4 ml-2 shrink-0" />}
                </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
