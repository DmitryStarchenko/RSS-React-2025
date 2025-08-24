import '@testing-library/jest-dom/vitest';

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Password } from '../password';
import { ComponentsProps } from '../../types';

vi.mock('../../../shared/form.module.css', () => ({
  formGroup: 'formGroup',
  errorView: 'errorView',
  errorMessage: 'errorMessage',
  error: 'error',
}));

describe('Password', () => {
  const mockRegister = vi.fn();
  const defaultProps: ComponentsProps = {
    register: mockRegister,
    errors: {},
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render password and confirm password fields', () => {
    render(<Password {...defaultProps} />);

    expect(screen.getByLabelText('Password *')).toBeInTheDocument();
    expect(screen.getByLabelText('Confirm password *')).toBeInTheDocument();
  });

  it('should call register for both password fields', () => {
    render(<Password {...defaultProps} />);

    expect(mockRegister).toHaveBeenCalledWith('password');
    expect(mockRegister).toHaveBeenCalledWith('confirmPassword');
  });

  it('should show error message for password field when error exists', () => {
    const propsWithError: ComponentsProps = {
      register: mockRegister,
      errors: {
        password: {
          message: 'Password is required',
          type: 'required',
        },
      },
    };

    render(<Password {...propsWithError} />);

    expect(screen.getByText('Password is required')).toBeInTheDocument();
    expect(screen.getByLabelText('Password *')).toHaveClass('error');
  });

  it('should show error message for confirmPassword field when error exists', () => {
    const propsWithError: ComponentsProps = {
      register: mockRegister,
      errors: {
        confirmPassword: {
          message: 'Passwords do not match',
          type: 'validate',
        },
      },
    };

    render(<Password {...propsWithError} />);

    expect(screen.getByText('Passwords do not match')).toBeInTheDocument();
    expect(screen.getByLabelText('Confirm password *')).toHaveClass('error');
  });

  it('should apply error class to password field when has error', () => {
    const propsWithError: ComponentsProps = {
      register: mockRegister,
      errors: {
        password: {
          message: 'Error',
          type: 'required',
        },
      },
    };

    render(<Password {...propsWithError} />);

    const passwordInput = screen.getByLabelText('Password *');
    expect(passwordInput).toHaveClass('error');
  });

  it('should apply error class to confirmPassword field when has error', () => {
    const propsWithError: ComponentsProps = {
      register: mockRegister,
      errors: {
        confirmPassword: {
          message: 'Error',
          type: 'validate',
        },
      },
    };

    render(<Password {...propsWithError} />);

    const confirmPasswordInput = screen.getByLabelText('Confirm password *');
    expect(confirmPasswordInput).toHaveClass('error');
  });

  it('should not apply error class when no errors', () => {
    render(<Password {...defaultProps} />);

    const passwordInput = screen.getByLabelText('Password *');
    const confirmPasswordInput = screen.getByLabelText('Confirm password *');

    expect(passwordInput).not.toHaveClass('error');
    expect(confirmPasswordInput).not.toHaveClass('error');
  });

  it('should have correct input types', () => {
    render(<Password {...defaultProps} />);

    const passwordInput = screen.getByLabelText('Password *');
    const confirmPasswordInput = screen.getByLabelText('Confirm password *');

    expect(passwordInput).toHaveAttribute('type', 'password');
    expect(confirmPasswordInput).toHaveAttribute('type', 'password');
  });

  it('should have correct ids for inputs', () => {
    render(<Password {...defaultProps} />);

    const passwordInput = screen.getByLabelText('Password *');
    const confirmPasswordInput = screen.getByLabelText('Confirm password *');

    expect(passwordInput).toHaveAttribute('id', 'password');
    expect(confirmPasswordInput).toHaveAttribute('id', 'confirmPassword');
  });
});
