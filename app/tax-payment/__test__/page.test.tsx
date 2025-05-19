import { render, screen, fireEvent } from '@testing-library/react';
import TaxPayment from '../page'; // sesuaikan path jika berbeda
import { useRouter } from 'next/navigation';

// Mock Custom Components
jest.mock('@/app/components/CustomInput', () => (props: any) => (
  <input
    aria-label={props.label}
    placeholder={props.place_holder}
    type={props.input_type}
    value={props.value}
    onChange={props.onChange}
  />
));

jest.mock('@/app/components/CustomButton', () => (props: any) => (
  <button onClick={() => window.location.assign(props.href)}>
    {props.children}
  </button>
));

// Mock redirect dari next/navigation
jest.mock('next/navigation', () => ({
  redirect: jest.fn(),
}));

import { redirect } from 'next/navigation';

describe('TaxPayment Component', () => {
  it('renders heading and input field correctly', () => {
    render(<TaxPayment />);

    expect(screen.getByText('Reference Lookup')).toBeInTheDocument();
    expect(screen.getByText('Find Your Submission')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('e.g., REF123456')).toBeInTheDocument();
    expect(screen.getByText('Search')).toBeInTheDocument();
    expect(screen.getByText('2024 TaxEase Portal. All rights reserved')).toBeInTheDocument();
  });

  it('updates input value on change', () => {
    render(<TaxPayment />);
    const input = screen.getByPlaceholderText('e.g., REF123456') as HTMLInputElement;
    
    fireEvent.change(input, { target: { value: 'REF-ABC123' } });

    expect(input.value).toBe('REF-ABC123');
  });

  it('redirects to receipt page on Search button click', () => {
    delete window.location;
    window.location = { assign: jest.fn() } as any;

    render(<TaxPayment />);
    
    const input = screen.getByPlaceholderText('e.g., REF123456');
    fireEvent.change(input, { target: { value: 'REF-XYZ789' } });

    const button = screen.getByText('Search');
    fireEvent.click(button);

    expect(window.location.assign).toHaveBeenCalledWith('/receipt/REF-XYZ789');
  });

  it('redirects to submission page on Home button click', () => {

    render(<TaxPayment />);
    
    const button = screen.getByText('Home');
    fireEvent.click(button);

        expect(redirect).toHaveBeenCalledWith('/submission');
    
  });
});
