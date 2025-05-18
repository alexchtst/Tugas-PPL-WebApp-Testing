import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TaxTypeDropdown from './TaxTypeDropdown';

describe('TaxTypeDropdown', () => {
  it('renders the label', () => {
    render(<TaxTypeDropdown />);
    expect(screen.getByText('Tax Type')).toBeInTheDocument();
  });

  it('renders the default select element', () => {
    render(<TaxTypeDropdown />);
    expect(screen.getByRole('combobox')).toBeInTheDocument();
    expect(screen.getByText('Select tax type')).toBeInTheDocument();
  });

  it('renders all available options', () => {
    render(<TaxTypeDropdown />);
    expect(screen.getByRole('option', { name: 'Income Tax' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Vehicle Tax' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Property Tax' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Business Tax' })).toBeInTheDocument();
  });

  it('allows selecting an option', async () => {
    render(<TaxTypeDropdown />);
    const select = screen.getByRole('combobox');
    await userEvent.selectOptions(select, 'Vehicle Tax');
    expect((select as HTMLSelectElement).value).toBe('Vehicle Tax');
  });
});
