'use client';

import React, { useState, useRef, useEffect } from 'react';
import Button from './Button';
import clsx from 'clsx';
import { ChevronDown } from 'lucide-react';

type DropdownProps = {
  options?: string[];
  selected: string;
  onSelect?: (value: string) => void;
  placeholder?: string;
  size: 'md' | 'sm' | 'lg';
};

const Dropdown: React.FC<DropdownProps> = ({
  options = [],
  selected,
  onSelect,
  placeholder = 'Select an option',
  size,
}) => {
  const [isOpen, setIsOpen] = useState(false);
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
    setIsOpen(false);
    onSelect?.(value);
  };

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <Button
        onClick={() => setIsOpen(!isOpen)}
        size={size}
        iconPosition="end"
        icon={<ChevronDown className='text-primary'/>}
        className="text-base min-w-46"
      >
        {selected || placeholder}
      </Button>

      {isOpen && options.length > 0 && (
        <div className="absolute z-50 mt-2 w-full min-w-40 bg-white border border-gray-200 rounded-md shadow-lg text-xs sm:text-base">
          {options.map((option) => (
            <label
              key={option}
              className={clsx(
                'flex justify-between items-center px-4 py-2 cursor-pointer hover:bg-gray-100 rounded',
                selected === option && 'bg-accent font-medium'
              )}
            >
              <span>{option}</span>
              <input
                type="radio"
                name="options"
                checked={selected === option}
                onChange={() => handleSelect(option)}
                className={clsx(
                'appearance-none w-4 h-4 rounded-full border border-gray-400 ml-2 relative',
                'checked:border-[5px] checked:border-[var(--color-primary)]'
              )}
              />
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
