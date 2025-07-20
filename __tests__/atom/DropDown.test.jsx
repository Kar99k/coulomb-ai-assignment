import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import Dropdown from '@/components/atoms/DropDown';
import React from 'react';

describe('Dropdown', () => {
    const options = ['Option 1', 'Option 2', 'Option 3'];

    it('renders the placeholder when nothing is selected', () => {
        render(<Dropdown options={options} selected="" size="md" />);
        expect(screen.getByText('Select an option')).toBeInTheDocument();
    });

    it('renders the selected value', () => {
        render(<Dropdown options={options} selected="Option 2" size="md" />);
        expect(screen.getByText('Option 2')).toBeInTheDocument();
    });

    it('shows options when button is clicked', () => {
        render(<Dropdown options={options} selected="" size="md" />);
        fireEvent.click(screen.getByRole('button'));
        expect(screen.getByText('Option 1')).toBeInTheDocument();
        expect(screen.getByText('Option 2')).toBeInTheDocument();
        expect(screen.getByText('Option 3')).toBeInTheDocument();
    });

    it('calls onSelect when an option is clicked', () => {
        const onSelect = jest.fn();
        render(<Dropdown options={options} selected="" onSelect={onSelect} size="md" />);
        fireEvent.click(screen.getByRole('button'));
        fireEvent.click(screen.getByText('Option 2'));
        expect(onSelect).toHaveBeenCalledWith('Option 2');
    });

    it('closes the dropdown and shows selected option in button', () => {
        const DropdownWrapper = () => {
            const [selected, setSelected] = React.useState('');
            return (
                <Dropdown
                    options={['Option 1', 'Option 2']}
                    selected={selected}
                    onSelect={(value) => setSelected(value)}
                    size="md"
                    placeholder="Select an option"
                />
            );
        };

        render(<DropdownWrapper />);
        fireEvent.click(screen.getByRole('button')); // open dropdown
        fireEvent.click(screen.getByText('Option 1')); // select option

        expect(screen.getByRole('button')).toHaveTextContent('Option 1');
    });

    it('closes the dropdown when clicking outside', () => {
        const DropdownWrapper = () => {
            const [selected, setSelected] = React.useState('');
            return (
                <>
                    <div data-testid="outside">Outside</div>
                    <Dropdown
                        options={['Option 1', 'Option 2']}
                        selected={selected}
                        onSelect={(value) => setSelected(value)}
                        size="md"
                        placeholder="Select an option"
                    />
                </>
            );
        };

        render(<DropdownWrapper />);

        fireEvent.click(screen.getByRole('button'));
        expect(screen.getByText('Option 1')).toBeVisible();

        fireEvent.mouseDown(screen.getByTestId('outside'));

        expect(screen.queryByText('Option 1')).not.toBeInTheDocument();
    });

});
