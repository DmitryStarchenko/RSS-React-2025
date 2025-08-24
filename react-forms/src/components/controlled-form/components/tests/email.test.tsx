import '@testing-library/jest-dom/vitest';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Email } from '../email';
import { FieldError, UseFormRegister } from 'react-hook-form';
import type { ComponentsProps } from '../../types';
import { FormData } from '../../../../globalTypes';

vi.mock('../../../shared/form.module.css', () => ({
  formGroup: 'formGroup',
  errorView: 'errorView',
  errorMessage: 'errorMessage',
  error: 'error',
}));

describe('Email', () => {
  const mockRegister = vi.fn(() => ({
    onChange: vi.fn(),
    onBlur: vi.fn(),
    ref: vi.fn(),
    name: 'email',
  }));

  const defaultProps: ComponentsProps = {
    register: mockRegister as UseFormRegister<FormData>,
    errors: {} as { email?: FieldError },
  };
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render email input field', () => {
    render(<Email {...defaultProps} />);
    expect(screen.getByLabelText('Email *')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toHaveAttribute('type', 'email');
    expect(screen.getByRole('textbox')).toHaveAttribute('id', 'email');
  });

  it('should call register function with email field name', () => {
    render(<Email {...defaultProps} />);
    expect(mockRegister).toHaveBeenCalledWith('email');
  });

  it('should not show error message when there are no errors', () => {
    render(<Email {...defaultProps} />);
    expect(screen.getByRole('textbox')).not.toHaveClass('error');
  });

  it('should show error message when there is an error', () => {
    const errorProps: ComponentsProps = {
      ...defaultProps,
      errors: {
        email: {
          type: 'required',
          message: 'Email is required',
        } as FieldError,
      },
    };
    render(<Email {...errorProps} />);
    expect(screen.getByText('Email is required')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toHaveClass('error');
  });

  it('should apply error class to input when there is an error', () => {
    const errorProps: ComponentsProps = {
      ...defaultProps,
      errors: {
        email: {
          type: 'invalid',
          message: 'Invalid email format',
        } as FieldError,
      },
    };
    render(<Email {...errorProps} />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveClass('error');
  });

  it('should not apply error class to input when there is no error', () => {
    render(<Email {...defaultProps} />);
    const input = screen.getByRole('textbox');
    expect(input).not.toHaveClass('error');
  });

  it('should render with correct accessibility attributes', () => {
    render(<Email {...defaultProps} />);
    const input = screen.getByRole('textbox');
    const label = screen.getByText('Email *');
    expect(input).toHaveAttribute('id', 'email');
    expect(label).toHaveAttribute('for', 'email');
  });

  it('should handle empty error object', () => {
    const emptyErrorProps: ComponentsProps = {
      ...defaultProps,
      errors: {} as { email?: FieldError },
    };
    render(<Email {...emptyErrorProps} />);
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    expect(screen.getByRole('textbox')).not.toHaveClass('error');
  });
});
