import React, { useState, useRef, useEffect } from 'react';
import { DayPicker, DateRange } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import Button from '../atoms/Button';
import { format, parseISO } from 'date-fns';

type Props = {
  value: { from: string; to: string };
  onChange: (range: { from: string; to: string }) => void;
};

const DateRangeDropdown: React.FC<Props> = ({ value, onChange }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [selected, setSelected] = useState<DateRange | undefined>({
    from: parseISO(value.from),
    to: parseISO(value.to),
  });

  useEffect(() => {
    if (selected?.from && selected?.to) {
      onChange({
        from: format(selected.from, 'yyyy-MM-dd'),
        to: format(selected.to, 'yyyy-MM-dd'),
      });
    }
  }, [selected]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const label =
    selected?.from && selected?.to
      ? `${format(selected.from, 'MMM dd')} - ${format(selected.to, 'MMM dd yyyy')}`
      : 'Select Dates';

  return (
    <div ref={dropdownRef} className="relative inline-block">
      <Button onClick={() => setOpen((prev) => !prev)} size="md">
        {label}
      </Button>

      {open && (
        <div className="absolute z-50 mt-2 bg-white p-4 rounded-xl shadow-lg flex gap-4">
          <DayPicker
            mode="range"
            numberOfMonths={2}
            selected={selected}
            onSelect={setSelected}
            disabled={{ after: new Date() }}
            defaultMonth={new Date(new Date().getFullYear(), new Date().getMonth() - 1)}
            max={90}
          />
        </div>
      )}
    </div>
  );
};

export default DateRangeDropdown;
