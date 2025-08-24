import '@testing-library/jest-dom/vitest';

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Name } from '../name';
import type { ComponentsProps } from '../../types';

vi.mock('../../../shared/form.module.css', () => ({
  formGroup: 'formGroup',
  errorView: 'errorView',
  errorMessage: 'errorMessage',
  error: 'error',
}));

describe('Name', () => {
  const mockRegister = vi.fn();
  const defaultProps: ComponentsProps = {
    register: mockRegister,
    errors: {},
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render name input field with label', () => {
    render(<Name {...defaultProps} />);

    expect(screen.getByLabelText('Name *')).toBeInTheDocument();
    expect(screen.getByText('Name *')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toHaveAttribute('id', 'firstName');
    expect(screen.getByRole('textbox')).toHaveAttribute('type', 'text');
  });

  it('should call register function with correct field name', () => {
    render(<Name {...defaultProps} />);

    expect(mockRegister).toHaveBeenCalledWith('firstName');
  });

  it('should not show error message when there are no errors', () => {
    render(<Name {...defaultProps} />);
    expect(screen.queryByText(/error/i)).not.toBeInTheDocument();
  });

  it('should show error message when there is an error', () => {
    const errorProps: ComponentsProps = {
      register: mockRegister,
      errors: {
        firstName: {
          message: 'Name is required',
          type: 'required',
        },
      },
    };

    render(<Name {...errorProps} />);
    expect(screen.getByText('Name is required')).toBeInTheDocument();
    expect(screen.getByText('Name is required')).toHaveClass('errorMessage');
  });

  it('should apply error class to input when there is an error', () => {
    const errorProps: ComponentsProps = {
      register: mockRegister,
      errors: {
        firstName: {
          message: 'Name is required',
          type: 'required',
        },
      },
    };

    render(<Name {...errorProps} />);

    const input = screen.getByRole('textbox');
    expect(input).toHaveClass('error');
  });

  it('should not apply error class to input when there are no errors', () => {
    render(<Name {...defaultProps} />);

    const input = screen.getByRole('textbox');
    expect(input).not.toHaveClass('error');
  });

  it('should handle empty error message', () => {
    const errorProps: ComponentsProps = {
      register: mockRegister,
      errors: {
        firstName: {
          message: '',
          type: 'required',
        },
      },
    };

    render(<Name {...errorProps} />);

    const input = screen.getByRole('textbox');
    expect(input).toHaveClass('error');
  });

  it('should handle error without message', () => {
    const errorProps: ComponentsProps = {
      register: mockRegister,
      errors: {
        firstName: {
          type: 'required',
        },
      },
    };

    render(<Name {...errorProps} />);

    const input = screen.getByRole('textbox');
    expect(input).toHaveClass('error');
  });
});
