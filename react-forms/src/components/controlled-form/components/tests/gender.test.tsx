import '@testing-library/jest-dom/vitest';

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Gender } from '../gender';
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { FormData } from '../../../../globalTypes';

vi.mock('../../../shared/form.module.css', () => ({
  formGroup: 'formGroup',
  radioGroup: 'radioGroup',
  errorView: 'errorView',
  errorMessage: 'errorMessage',
}));

describe('Gender', () => {
  const mockRegister = vi.fn();
  const defaultProps = {
    register: mockRegister as UseFormRegister<FormData>,
    errors: {} as FieldErrors<FormData>,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render gender radio buttons', () => {
    render(<Gender {...defaultProps} />);

    expect(screen.getByLabelText('Male')).toBeInTheDocument();
    expect(screen.getByLabelText('Female')).toBeInTheDocument();
    expect(screen.getByText('Gender *')).toBeInTheDocument();
  });

  it('should have correct input attributes', () => {
    render(<Gender {...defaultProps} />);

    const maleInput = screen.getByLabelText('Male') as HTMLInputElement;
    const femaleInput = screen.getByLabelText('Female') as HTMLInputElement;

    expect(maleInput.type).toBe('radio');
    expect(maleInput.value).toBe('male');
    expect(maleInput.id).toBe('male');

    expect(femaleInput.type).toBe('radio');
    expect(femaleInput.value).toBe('female');
    expect(femaleInput.id).toBe('female');
  });

  it('should call register function for both inputs', () => {
    render(<Gender {...defaultProps} />);

    expect(mockRegister).toHaveBeenCalledWith('gender');
  });

  it('should show error message when gender error exists', () => {
    const propsWithError = {
      ...defaultProps,
      errors: {
        gender: {
          message: 'Gender is required',
          type: 'required',
        },
      } as FieldErrors<FormData>,
    };

    render(<Gender {...propsWithError} />);

    expect(screen.getByText('Gender is required')).toBeInTheDocument();
    expect(screen.getByText('Gender is required')).toHaveClass('errorMessage');
  });

  it('should not show error message for other field errors', () => {
    const propsWithOtherError = {
      ...defaultProps,
      errors: {
        email: {
          message: 'Email is invalid',
          type: 'pattern',
        },
      } as FieldErrors<FormData>,
    };

    render(<Gender {...propsWithOtherError} />);

    expect(screen.queryByText('Email is invalid')).not.toBeInTheDocument();
  });

  it('should render with correct structure', () => {
    const { container } = render(<Gender {...defaultProps} />);

    const formGroup = container.querySelector('.formGroup');
    const radioGroup = container.querySelector('.radioGroup');
    const errorView = container.querySelector('.errorView');

    expect(formGroup).toBeInTheDocument();
    expect(radioGroup).toBeInTheDocument();
    expect(errorView).toBeInTheDocument();
  });

  it('should have accessible labels', () => {
    render(<Gender {...defaultProps} />);

    const maleInput = screen.getByLabelText('Male');
    const femaleInput = screen.getByLabelText('Female');

    expect(maleInput).toBeInTheDocument();
    expect(femaleInput).toBeInTheDocument();
    expect(maleInput).toHaveAccessibleName('Male');
    expect(femaleInput).toHaveAccessibleName('Female');
  });
});
