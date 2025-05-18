import { render, screen, fireEvent } from '@testing-library/react';
import Submission from '../page';

describe('Submission Page', () => {
  it('renders the main heading and form components', () => {
    render(<Submission />);

    expect(screen.getByText('Submit Tax Payment')).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Enter Amount/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit payment/i })).toBeInTheDocument();
  });

  it('shows error when tax amount is negative', () => {
    render(<Submission />);

    const input = screen.getByPlaceholderText(/Enter Amount/i);
    fireEvent.change(input, { target: { value: '-500' } });

    const submitButton = screen.getByRole('button', { name: /submit payment/i });
    fireEvent.click(submitButton);

    expect(screen.getByText(/Tax amount must be a positive number/i)).toBeInTheDocument();
  });

  it('does not show error for valid tax amount', () => {
    render(<Submission />);

    const input = screen.getByPlaceholderText(/Enter Amount/i);
    fireEvent.change(input, { target: { value: '1500' } });

    const submitButton = screen.getByRole('button', { name: /submit payment/i });
    fireEvent.click(submitButton);

    // Error message should not exist
    expect(screen.queryByText(/Tax amount must be a positive number/i)).not.toBeInTheDocument();
  });
});
