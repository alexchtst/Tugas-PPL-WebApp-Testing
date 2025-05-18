import { render, screen, fireEvent } from '@testing-library/react';
import CustomInput from './CustomInput';

describe('CustomInput', () => {
  it('renders label and placeholder correctly', () => {
    render(
      <CustomInput
        label="Tax Amount"
        input_type="number"
        place_holder="Enter amount"
      />
    );

    expect(screen.getByLabelText('Tax Amount')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter amount')).toBeInTheDocument();
  });

  it('renders with provided value', () => {
    render(
      <CustomInput
        label="Name"
        input_type="text"
        place_holder="Your name"
        value="Dinda"
        onChange={() => {}}
      />
    );
    expect(screen.getByDisplayValue('Dinda')).toBeInTheDocument();
  });

  it('calls onChange when value changes', () => {
    const handleChange = jest.fn();
    render(
      <CustomInput
        label="Tax"
        input_type="number"
        place_holder="Enter tax"
        onChange={handleChange}
      />
    );

    const input = screen.getByPlaceholderText('Enter tax');
    fireEvent.change(input, { target: { value: '123' } });

    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('applies error class and displays error message', () => {
    render(
      <CustomInput
        label="Amount"
        input_type="number"
        place_holder="..."
        errorMessage="Amount must be positive"
      />
    );

    const input = screen.getByLabelText('Amount');
    expect(input).toHaveClass('border-red-500');
    expect(screen.getByText('Amount must be positive')).toBeInTheDocument();
  });

  it('accepts additional custom class', () => {
    const { container } = render(
      <CustomInput
        label="Nominal"
        input_type="number"
        place_holder="Nominal"
        className="bg-yellow-50"
      />
    );

    const input = container.querySelector('input');
    expect(input).toHaveClass('bg-yellow-50');
  });
});
