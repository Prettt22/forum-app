/**
 * skenario testing
 *
 * - LoginInput component
 *   - should handle email typing correctly
 *   - should handle password typing correctly
 *   - should call login function when login button is clicked
 */

import * as matchers from '@testing-library/jest-dom/matchers';
import LoginInput from './LoginInput';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';

expect.extend(matchers);

describe('LoginInput component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should handle email typing correctly', async () => {
    render(<LoginInput login={() => {}} />);
    const emailInput = await screen.getByTestId('email-input');
    await userEvent.type(emailInput, 'emailnya@gmail.com');
    expect(emailInput).toHaveValue('emailnya@gmail.com');
  });

  it('should handle password typing correctly', async () => {
    render(<LoginInput login={() => {}} />);
    const passwordInput = await screen.getByTestId('password-input');
    await userEvent.type(passwordInput, 'passwordnya');
    expect(passwordInput).toHaveValue('passwordnya');
  });

  it('should call login function when login button is clicked', async () => {
    const mockLogin = vi.fn();
    render(<LoginInput login={mockLogin} />);

    const emailInput = await screen.getByTestId('email-input');
    await userEvent.type(emailInput, 'emailnya@gmail.com');

    const passwordInput = await screen.getByTestId('password-input');
    await userEvent.type(passwordInput, 'passwordnya');

    const loginButton = await screen.getByTestId('login-button');
    await userEvent.click(loginButton);

    expect(mockLogin).toBeCalledWith({
      email: 'emailnya@gmail.com',
      password: 'passwordnya',
    });
  });
});
