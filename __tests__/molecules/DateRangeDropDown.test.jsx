import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import DateRangeDropdown from '@/components/molecules/DateRangeDropdown';
import { format, parseISO } from 'date-fns';

describe('DateRangeDropdown', () => {
    const today = new Date();
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(today.getDate() - 7);

    const defaultValue = {
        from: format(sevenDaysAgo, 'yyyy-MM-dd'),
        to: format(today, 'yyyy-MM-dd'),
    };

    it('renders with default value', () => {
        render(<DateRangeDropdown value={defaultValue} onChange={() => { }} />);
        const label = `${format(parseISO(defaultValue.from), 'MMM dd')} - ${format(
            parseISO(defaultValue.to),
            'MMM dd yyyy'
        )}`;
        expect(screen.getByRole('button', { name: label })).toBeInTheDocument();
    });


    it('calls onChange when a new range is selected', async () => {
        const onChangeMock = jest.fn();
        render(<DateRangeDropdown value={defaultValue} onChange={onChangeMock} />);
        fireEvent.click(screen.getByRole('button'));

        const allDays = screen.getAllByRole('gridcell');
        fireEvent.click(allDays[10]);
        fireEvent.click(allDays[14]);

        await waitFor(() => {
            expect(onChangeMock).toHaveBeenCalledTimes(1);
        });

        const [[range]] = onChangeMock.mock.calls;
        expect(range.from).toMatch(/\d{4}-\d{2}-\d{2}/);
        expect(range.to).toMatch(/\d{4}-\d{2}-\d{2}/);
    });

    it('closes the dropdown when clicking outside', async () => {
        render(
            <>
                <div data-testid="outside">Outside</div>
                <DateRangeDropdown value={defaultValue} onChange={() => { }} />
            </>
        );

        fireEvent.click(screen.getByRole('button'));
        expect(screen.getByRole('calendar')).toBeInTheDocument();

        fireEvent.mouseDown(screen.getByTestId('outside'));
        expect(screen.queryByRole('calendar')).not.toBeInTheDocument();
    });

});
