import '@testing-library/jest-dom/vitest';

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { TermsAgreement } from '../terms-agreement';
import type { ComponentsProps } from '../../types';

vi.mock('../../../shared/form.module.css', () => ({
  formGroup: 'formGroup',
  checkboxLabel: 'checkboxLabel',
  errorView: 'errorView',
  errorMessage: 'errorMessage',
}));

describe('TermsAgreement', () => {
  const mockRegister = vi.fn();
  const defaultProps: ComponentsProps = {
    register: mockRegister,
    errors: {},
  };

  beforeEach(() => {
    vi.clearAllMocks();
    mockRegister.mockReturnValue({});
  });

  it('should render checkbox and label', () => {
    render(<TermsAgreement {...defaultProps} />);

    expect(
      screen.getByLabelText(/I accept the terms of the agreement/),
    ).toBeInTheDocument();
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });

  it('should call register function with correct field name', () => {
    render(<TermsAgreement {...defaultProps} />);

    expect(mockRegister).toHaveBeenCalledWith('terms');
  });

  it('should not show error message when there are no errors', () => {
    render(<TermsAgreement {...defaultProps} />);

    const errorMessage = screen.queryByText(/error/);
    expect(errorMessage).not.toBeInTheDocument();
  });

  it('should show error message when terms field has error', () => {
    const propsWithError: ComponentsProps = {
      ...defaultProps,
      errors: {
        terms: {
          message: 'You must accept the terms',
          type: 'required',
        },
      },
    };

    render(<TermsAgreement {...propsWithError} />);

    expect(screen.getByText('You must accept the terms')).toBeInTheDocument();
  });

  it('should apply correct CSS classes', () => {
    const { container } = render(<TermsAgreement {...defaultProps} />);

    expect(container.querySelector('.formGroup')).toBeInTheDocument();
    expect(container.querySelector('.checkboxLabel')).toBeInTheDocument();
    expect(container.querySelector('.errorView')).toBeInTheDocument();
  });
});
