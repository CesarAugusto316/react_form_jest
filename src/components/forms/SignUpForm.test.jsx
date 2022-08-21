import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  describe, it, expect, vi, beforeEach,
} from 'vitest';
import { SignupForm } from './SignUpForm';


describe('<SignUpForm/>', () => {
  const handleSubmit = vi.fn();
  let myContainer;

  beforeEach(() => {
    const { container } = render(<SignupForm handleSubmit={handleSubmit} />);
    myContainer = container;
    handleSubmit.mockClear();
  });

  it('should have form "inputs" empties', () => {
    expect(screen
      .queryByRole('form'))
      .toHaveFormValues({
        name: '',
        country: '',
        email: '',
      });
  });

  it('should have submit "button" disabled on first render', () => {
    expect(screen
      .queryByRole('button', { name: /submit/i }))
      .toBeDisabled();
  });

  it('should enable submit "button" when form is valid', async () => {
    const user = userEvent.setup();

    await user.type(screen.getByPlaceholderText(/name/i), 'cesar rivera');
    await user.type(screen.getByPlaceholderText(/email/i), 'riveramirandac@gmail.com');
    await user.type(screen.getByPlaceholderText(/country/i), 'ecuador');

    expect(screen
      .queryByRole('button', { name: /submit/i }))
      .toBeEnabled();

    screen.debug(myContainer
      .querySelector('button[type="submit"]'));
  });

  it('should disable submit "button" after submision', async () => {
    const user = userEvent.setup();
    await user.type(screen.getByPlaceholderText(/name/i), 'cesar rivera');
    await user.type(screen.getByPlaceholderText(/email/i), 'riveramirandac@gmail.com');
    await user.type(screen.getByPlaceholderText(/country/i), 'ecuador');

    await user.click(screen.getByRole('button', { name: /submit/i }));

    expect(handleSubmit).toHaveBeenCalledWith({
      name: 'cesar rivera',
      email: 'riveramirandac@gmail.com',
      country: 'ecuador',
    });

    expect(screen
      .queryByRole('button', { name: /submit/i }))
      .toBeDisabled();

    screen.debug(myContainer
      .querySelector('button[type="submit"]'));
  });
});
