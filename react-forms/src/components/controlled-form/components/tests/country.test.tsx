import '@testing-library/jest-dom/vitest';

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Country } from '../country';
import { UseFormSetValue } from 'react-hook-form';
import { FormData } from '../../../../globalTypes';

vi.mock('../../../shared/form.module.css', () => ({
  formGroup: 'formGroup',
  countrySelectContainer: 'countrySelectContainer',
  countryDropdown: 'countryDropdown',
  countryOption: 'countryOption',
  errorView: 'errorView',
  errorMessage: 'errorMessage',
  error: 'error',
}));

describe('Country', () => {
  const mockSetValue = vi.fn() as UseFormSetValue<FormData>;
  const mockCountries = [
    'United States',
    'Canada',
    'United Kingdom',
    'Germany',
  ];
  const defaultProps = {
    setValue: mockSetValue,
    countries: mockCountries,
    error: undefined,
  };

  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should render input with label and placeholder', () => {
    render(<Country {...defaultProps} />);
    expect(screen.getByLabelText('Country *')).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('Start typing country name...'),
    ).toBeInTheDocument();
  });

  it('should show error message when error prop is provided', () => {
    const errorMessage = 'Country is required';
    render(<Country {...defaultProps} error={errorMessage} />);
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toHaveClass('error');
  });

  it('should filter countries based on search term', () => {
    render(<Country {...defaultProps} />);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'unit' } });
    expect(screen.getByText('United States')).toBeInTheDocument();
    expect(screen.getByText('United Kingdom')).toBeInTheDocument();
    expect(screen.queryByText('Canada')).not.toBeInTheDocument();
    expect(screen.queryByText('Germany')).not.toBeInTheDocument();
  });

  it('should show all countries when search term is empty', () => {
    render(<Country {...defaultProps} />);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'unit' } });
    fireEvent.change(input, { target: { value: '' } });
    mockCountries.forEach((country) => {
      expect(screen.getByText(country)).toBeInTheDocument();
    });
  });

  it('should call setValue when country is selected', () => {
    render(<Country {...defaultProps} />);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'can' } });
    const canadaOption = screen.getByText('Canada');
    fireEvent.click(canadaOption);
    expect(mockSetValue).toHaveBeenCalledWith(
      'country',
      'Canada',
      expect.objectContaining({ shouldValidate: true }),
    );
    expect(input).toHaveValue('Canada');
  });

  it('should close dropdown when country is selected', () => {
    render(<Country {...defaultProps} />);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'can' } });
    expect(screen.getByText('Canada')).toBeInTheDocument();
    const canadaOption = screen.getByText('Canada');
    fireEvent.click(canadaOption);
    expect(screen.queryByText('Canada')).not.toBeInTheDocument();
  });

  it('should select first country on Enter key press', () => {
    render(<Country {...defaultProps} />);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'unit' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(mockSetValue).toHaveBeenCalledWith(
      'country',
      'United States',
      expect.objectContaining({ shouldValidate: true }),
    );
    expect(input).toHaveValue('United States');
  });

  it('should not show dropdown when no countries match search', () => {
    render(<Country {...defaultProps} />);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'xyz' } });
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('should clear search term when input is focused and selected country matches', () => {
    render(<Country {...defaultProps} />);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'can' } });
    const canadaOption = screen.getByText('Canada');
    fireEvent.click(canadaOption);
    fireEvent.focus(input);
    expect(input).toHaveValue('');
  });

  it('should set value when exact match is found during typing', () => {
    render(<Country {...defaultProps} />);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'Canada' } });
    expect(mockSetValue).toHaveBeenCalledWith(
      'country',
      'Canada',
      expect.objectContaining({ shouldValidate: true }),
    );
  });

  it('should clear value when no exact match is found during typing', () => {
    render(<Country {...defaultProps} />);

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'Canada' } });
    vi.clearAllMocks();
    fireEvent.change(input, { target: { value: 'Invalid' } });
    expect(mockSetValue).toHaveBeenCalledWith(
      'country',
      '',
      expect.objectContaining({ shouldValidate: true }),
    );
  });
});
