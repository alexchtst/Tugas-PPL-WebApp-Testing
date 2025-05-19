import { render, screen, fireEvent } from '@testing-library/react';
import Submission from '../page';

// Mock redirect dari next/navigation
jest.mock('next/navigation', () => ({
  redirect: jest.fn(),
}));

import { redirect } from 'next/navigation';

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

  it('redirects to tax-payment page on Find Receipt button click', () => {
    render(<Submission />);

    const button = screen.getByText('Find Receipt');
    fireEvent.click(button);

    expect(redirect).toHaveBeenCalledWith('/tax-payment');

  });
});
