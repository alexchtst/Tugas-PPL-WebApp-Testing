import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CustomButton from './CustomButton';

describe('CustomButton', () => {
  it('renders children correctly', () => {
    render(<CustomButton>Click Me</CustomButton>);
    expect(screen.getByText('Click Me')).toBeInTheDocument();
  });

  it('calls onClick when clicked', async () => {
    const handleClick = jest.fn();
    render(<CustomButton onClick={handleClick}>Click</CustomButton>);
    await userEvent.click(screen.getByText('Click'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('applies custom className', () => {
    const { container } = render(
      <CustomButton className="custom-class">Test</CustomButton>
    );
    const button = container.querySelector('button');
    expect(button).toHaveClass('custom-class');
  });

  it('uses default type="button"', () => {
    render(<CustomButton>Default</CustomButton>);
    expect(screen.getByRole('button')).toHaveAttribute('type', 'button');
  });

  it('allows overriding type to submit', () => {
    render(<CustomButton type="submit">Submit</CustomButton>);
    expect(screen.getByRole('button')).toHaveAttribute('type', 'submit');
  });
});
