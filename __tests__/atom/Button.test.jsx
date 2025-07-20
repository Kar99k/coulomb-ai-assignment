import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import Button from '@/components/atoms/Button';
import React from 'react';

describe('Button', () => {
    it('renders children', () => {
        render(<Button>Click me</Button>);
        expect(screen.getByText('Click me')).toBeInTheDocument();
    });

    it('calls onClick when clicked', () => {
        const handleClick = jest.fn();
        render(<Button onClick={handleClick}>Click</Button>);
        fireEvent.click(screen.getByText('Click'));
        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('renders icon at start', () => {
        render(<Button icon={<span data-testid="icon">*</span>} iconPosition="start">With Icon</Button>);
        const icon = screen.getByTestId('icon');
        expect(icon).toBeInTheDocument();
    });

    it('renders icon at end', () => {
        render(<Button icon={<span data-testid="icon">*</span>} iconPosition="end">With Icon</Button>);
        const icon = screen.getByTestId('icon');
        expect(icon).toBeInTheDocument();
    });
});
