import '@testing-library/jest-dom/vitest';

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { Country } from '../country';
import { FormData } from '../../../../globalTypes';

vi.mock('../../../shared/form.module.css', () => ({
  formGroup: 'formGroup',
  countrySelectContainer: 'countrySelectContainer',
  countryDropdown: 'countryDropdown',
  countryOption: 'countryOption',
  errorView: 'errorView',
  errorMessage: 'errorMessage',
}));

const createTestStore = (countries: string[] = []) => {
  return configureStore({
    reducer: {
      countries: (state = { list: countries }) => state,
    },
    preloadedState: {
      countries: { list: countries },
    },
  });
};

const renderWithProvider = (
  component: React.ReactElement,
  countries: string[] = [],
) => {
  const store = createTestStore(countries);
  return render(<Provider store={store}>{component}</Provider>);
};

describe('Country', () => {
  const createMockRef = (): React.RefObject<HTMLInputElement> => {
    const inputElement = document.createElement('input');
    return {
      current: inputElement,
    };
  };

  const mockFieldErrors: Partial<Record<keyof FormData, string>> = {};
  const mockCountries = [
    'United States',
    'Canada',
    'United Kingdom',
    'Germany',
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render country input field', () => {
    const mockCountryRef = createMockRef();
    renderWithProvider(
      <Country countryRef={mockCountryRef} fieldErrors={mockFieldErrors} />,
      mockCountries,
    );

    expect(screen.getByLabelText('Country *')).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('Start typing country name...'),
    ).toBeInTheDocument();
  });

  it('should show error message when fieldErrors contains country error', () => {
    const mockCountryRef = createMockRef();
    const fieldErrorsWithError = { country: 'Country is required' };

    renderWithProvider(
      <Country
        countryRef={mockCountryRef}
        fieldErrors={fieldErrorsWithError}
      />,
      mockCountries,
    );

    expect(screen.getByText('Country is required')).toBeInTheDocument();
  });

  it('should not show error message when fieldErrors does not contain country error', () => {
    const mockCountryRef = createMockRef();
    renderWithProvider(
      <Country countryRef={mockCountryRef} fieldErrors={mockFieldErrors} />,
      mockCountries,
    );

    const errorElement = screen.getByTestId('country-error');
    expect(errorElement).toHaveTextContent('');
  });

  it('should filter countries based on input', () => {
    const mockCountryRef = createMockRef();
    renderWithProvider(
      <Country countryRef={mockCountryRef} fieldErrors={mockFieldErrors} />,
      mockCountries,
    );

    const input = screen.getByLabelText('Country *');
    fireEvent.input(input, { target: { value: 'unit' } });

    const dropdownOptions = screen.getAllByRole('option');
    expect(dropdownOptions).toHaveLength(2);
    expect(screen.getByText('United States')).toBeInTheDocument();
    expect(screen.getByText('United Kingdom')).toBeInTheDocument();
  });

  it('should show all countries when input is empty', () => {
    const mockCountryRef = createMockRef();
    renderWithProvider(
      <Country countryRef={mockCountryRef} fieldErrors={mockFieldErrors} />,
      mockCountries,
    );

    const input = screen.getByLabelText('Country *');
    fireEvent.input(input, { target: { value: '' } });

    const dropdownOptions = screen.getAllByRole('option');
    expect(dropdownOptions).toHaveLength(mockCountries.length);
  });

  it('should select country when option is clicked', () => {
    const mockCountryRef = createMockRef();
    renderWithProvider(
      <Country countryRef={mockCountryRef} fieldErrors={mockFieldErrors} />,
      mockCountries,
    );

    const input = screen.getByLabelText('Country *');
    fireEvent.input(input, { target: { value: 'unit' } });

    const option = screen.getByText('United States');
    fireEvent.click(option);

    expect(input).toHaveValue('United States');
  });

  it('should hide dropdown after selecting a country', () => {
    const mockCountryRef = createMockRef();
    renderWithProvider(
      <Country countryRef={mockCountryRef} fieldErrors={mockFieldErrors} />,
      mockCountries,
    );

    const input = screen.getByLabelText('Country *');
    fireEvent.input(input, { target: { value: 'unit' } });
    expect(screen.getByRole('listbox')).toBeInTheDocument();

    const option = screen.getByText('United States');
    fireEvent.click(option);
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('should show dropdown on input focus', () => {
    const mockCountryRef = createMockRef();
    renderWithProvider(
      <Country countryRef={mockCountryRef} fieldErrors={mockFieldErrors} />,
      mockCountries,
    );

    const input = screen.getByLabelText('Country *');
    fireEvent.focus(input);

    expect(screen.getByRole('listbox')).toBeInTheDocument();
  });

  it('should not show dropdown when no countries match filter', () => {
    const mockCountryRef = createMockRef();
    renderWithProvider(
      <Country countryRef={mockCountryRef} fieldErrors={mockFieldErrors} />,
      mockCountries,
    );

    const input = screen.getByLabelText('Country *');
    fireEvent.input(input, { target: { value: 'xyz' } });

    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('should handle case insensitive filtering', () => {
    const mockCountryRef = createMockRef();
    renderWithProvider(
      <Country countryRef={mockCountryRef} fieldErrors={mockFieldErrors} />,
      mockCountries,
    );

    const input = screen.getByLabelText('Country *');
    fireEvent.input(input, { target: { value: 'UNITED' } });

    const dropdownOptions = screen.getAllByRole('option');
    expect(dropdownOptions).toHaveLength(2);
    expect(screen.getByText('United States')).toBeInTheDocument();
    expect(screen.getByText('United Kingdom')).toBeInTheDocument();
  });

  it('should work with empty countries list', () => {
    const mockCountryRef = createMockRef();
    renderWithProvider(
      <Country countryRef={mockCountryRef} fieldErrors={mockFieldErrors} />,
      [],
    );

    const input = screen.getByLabelText('Country *');
    fireEvent.focus(input);

    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });
});
