import '@testing-library/jest-dom/vitest';

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Age } from '../age';
import { FieldError, FieldErrors } from 'react-hook-form';

vi.mock('../../../shared/form.module.css', () => ({
  formGroup: 'formGroup',
  errorView: 'errorView',
  errorMessage: 'errorMessage',
  error: 'error',
}));

describe('Age', () => {
  const mockRegister = vi.fn();
  const defaultProps = {
    register: mockRegister,
    errors: {} as Partial<Record<string, FieldError>>,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render age input field', () => {
    render(<Age {...defaultProps} />);

    expect(screen.getByLabelText('Age *')).toBeInTheDocument();
    expect(screen.getByRole('spinbutton')).toHaveAttribute('type', 'number');
    expect(screen.getByRole('spinbutton')).toHaveAttribute('id', 'age');
  });

  it('should call register with correct parameters', () => {
    render(<Age {...defaultProps} />);

    expect(mockRegister).toHaveBeenCalledWith('age', { valueAsNumber: true });
  });

  it('should not show error message when there are no errors', () => {
    render(<Age {...defaultProps} />);

    expect(screen.queryByText(/error/)).not.toBeInTheDocument();
    expect(screen.getByRole('spinbutton')).not.toHaveClass('error');
  });

  it('should show error message when age error exists', () => {
    const propsWithError = {
      ...defaultProps,
      errors: {
        age: {
          type: 'required',
          message: 'Age is required',
        } as FieldError,
      },
    };

    render(<Age {...propsWithError} />);

    expect(screen.getByText('Age is required')).toBeInTheDocument();
    expect(screen.getByRole('spinbutton')).toHaveClass('error');
  });

  it('should apply error class when age field has error', () => {
    const propsWithError = {
      ...defaultProps,
      errors: {
        age: {
          type: 'min',
          message: 'Age must be at least 18',
        } as FieldError,
      },
    };

    render(<Age {...propsWithError} />);

    const input = screen.getByRole('spinbutton');
    expect(input).toHaveClass('error');
  });

  it('should not show error for other field errors', () => {
    const propsWithOtherError = {
      ...defaultProps,
      errors: {
        name: {
          type: 'required',
          message: 'Name is required',
        },
      } as FieldErrors<FormData>,
    };

    render(<Age {...propsWithOtherError} />);

    expect(screen.queryByText('Name is required')).not.toBeInTheDocument();
    expect(screen.queryByText('Age is required')).not.toBeInTheDocument();
    expect(screen.getByRole('spinbutton')).not.toHaveClass('error');
  });

  it('should render with empty error object', () => {
    render(<Age {...defaultProps} errors={{}} />);

    expect(screen.getByLabelText('Age *')).toBeInTheDocument();
    expect(screen.queryByText(/error/)).not.toBeInTheDocument();
  });
});
