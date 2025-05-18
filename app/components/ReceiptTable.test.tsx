import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ReceiptTable from './ReceiptTable';

jest.mock('next/navigation', () => ({
  redirect: jest.fn(), // kita mock fungsi redirect
}));

describe('ReceiptTable', () => {
  const dummyData = {
    ref_num: 'TAX-123456',
    tax_type: 'Income Tax',
    tax_ammount: 150000,
    submission_date: '2025-05-18',
  };

  it('renders all receipt information correctly', () => {
    render(<ReceiptTable {...dummyData} />);

    expect(screen.getByText('Reference Number')).toBeInTheDocument();
    expect(screen.getByText(dummyData.ref_num)).toBeInTheDocument();

    expect(screen.getByText('Tax Type')).toBeInTheDocument();
    expect(screen.getByText(dummyData.tax_type)).toBeInTheDocument();

    expect(screen.getByText('Tax Amount')).toBeInTheDocument();
    expect(screen.getByText('Rp 150000.00')).toBeInTheDocument();

    expect(screen.getByText('Submission Date')).toBeInTheDocument();
    expect(screen.getByText(dummyData.submission_date)).toBeInTheDocument();
  });

  it('renders back button with label', () => {
    render(<ReceiptTable {...dummyData} />);
    expect(screen.getByText('Back to New Submission')).toBeInTheDocument();
  });

  it('calls redirect when back button is clicked', async () => {
    const { redirect } = require('next/navigation');
    render(<ReceiptTable {...dummyData} />);
    await userEvent.click(screen.getByText('Back to New Submission'));
    expect(redirect).toHaveBeenCalledWith('/submission');
  });
});
