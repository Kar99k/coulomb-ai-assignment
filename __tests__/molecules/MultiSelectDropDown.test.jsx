import { render, screen, fireEvent, getByRole } from '@testing-library/react';
import MultiSelectDropdown from '@/components/molecules/MultiSelectDropdown'; 
import React,{useState} from 'react';

describe('MultiSelectDropdown', () => {
    const OPTIONS = ['India', 'USA', 'Germany'];
    const getLabel = (val) => `Country: ${val}`;
    const MAXSELECT = 2;

    it('renders the button with default label', () => {
        render(
            <MultiSelectDropdown
                options={OPTIONS}
                selected={[]}
                onSelect={() => { }}
            />
        );
        expect(screen.getByText(`Select up to ${MAXSELECT}`)).toBeInTheDocument();
    });

    it('displays selected values using getLabel', () => {
        render(
            <MultiSelectDropdown
                options={OPTIONS}
                selected={['India', 'USA']}
                onSelect={() => { }}
                getLabel={getLabel}
            />
        );
        expect(screen.getByText('Country: India, Country: USA')).toBeInTheDocument();
    });

    it('opens and shows options when clicked', () => {
        render(
            <MultiSelectDropdown
                options={OPTIONS}
                selected={[]}
                onSelect={() => { }}
            />
        );

        const button = screen.getByRole('button');
        fireEvent.click(button);

        OPTIONS.forEach((option) => {
            expect(screen.getByText(option)).toBeInTheDocument();
        });
    });

    it('calls onSelect when an option is selected', () => {
        const onSelectMock = jest.fn();
        render(
            <MultiSelectDropdown
                options={OPTIONS}
                selected={[]}
                onSelect={onSelectMock}
            />
        );

        fireEvent.click(screen.getByRole('button'));
        fireEvent.click(screen.getByText('India'));

        expect(onSelectMock).toHaveBeenCalledWith(['India']);
    });

    it('closes dropdown on outside click', () => {
        render(
            <div>
                <MultiSelectDropdown
                    options={OPTIONS}
                    selected={[]}
                    onSelect={() => { }}
                />
                <div data-testid="outside">Outside</div>
            </div>
        );

        fireEvent.click(screen.getByRole('button'));
        expect(screen.getByText('India')).toBeInTheDocument();

        fireEvent.mouseDown(screen.getByTestId('outside'));
        expect(screen.queryByText('India')).not.toBeInTheDocument();
    });

    it('handles multiselect with maxSelect prop',()=>{
        const Wrapper = () => {
            const [selected, setSelected] = useState([]);
            return (
                <MultiSelectDropdown
                    options={OPTIONS}
                    selected={selected}
                    onSelect={setSelected}
                    maxSelect={MAXSELECT}
                />
            );
        };

        render(<Wrapper />);

        const button = screen.getByRole('button');

        fireEvent.click(button);
        fireEvent.click(screen.getByText('India'));
        fireEvent.click(screen.getByText('USA'));
        fireEvent.click(screen.getByText('Germany'));

        expect(button).toHaveTextContent('India, USA');
    })
});
