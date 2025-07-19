'use client';

import React, { useState, useRef, useEffect } from 'react';
import Button from './Button';
import clsx from 'clsx';
import { ChevronDown } from 'lucide-react';

type DropdownProps = {
  options?: string[];
  selected: string
  customTrigger?: React.ReactNode;
  onSelect?: (value: string) => void;
  placeholder?: string;
  size:"md" | "sm" | "lg"
};

const Dropdown: React.FC<DropdownProps> = ({
  options = [],
  customTrigger,
  onSelect,
  placeholder = 'Select an option',
  size
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (value: string) => {
    setSelected(value);
    setIsOpen(false);
    onSelect?.(value);
  };

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      {customTrigger ? (
        <div onClick={() => setIsOpen(!isOpen)}>{customTrigger}</div>
      ) : (
        <Button onClick={() => setIsOpen(!isOpen)} size={size} iconPosition='end' icon={<ChevronDown />} className='text-base min-w-46'>
          {selected || placeholder}
        </Button>
      )}

      {isOpen && options.length > 0 && (
        <div className="absolute z-50 mt-2 w-full min-w-40 bg-white border border-gray-200 rounded-md shadow-lg">
          {options.map(option => (
            <div
              key={option}
              onClick={() => handleSelect(option)}
              className={clsx(
                'px-4 py-2 cursor-pointer hover:bg-gray-100',
                selected === option && 'bg-gray-100 font-medium'
              )}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
