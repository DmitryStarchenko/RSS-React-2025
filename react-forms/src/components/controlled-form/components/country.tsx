import React, { useState, useEffect } from 'react';
import { UseFormSetValue } from 'react-hook-form';
import { FormData } from '../../../globalTypes';
import styles from '../../../shared/form.module.css';

interface CountrySelectProps {
  setValue: UseFormSetValue<FormData>;
  error?: string;
  countries: string[];
}

export function Country({ setValue, error, countries }: CountrySelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCountries, setFilteredCountries] =
    useState<string[]>(countries);
  const [selectedCountry, setSelectedCountry] = useState('');

  useEffect(() => {
    if (searchTerm === '') {
      setFilteredCountries(countries);
    } else {
      const filtered = countries.filter((country) =>
        country.toLowerCase().includes(searchTerm.toLowerCase()),
      );
      setFilteredCountries(filtered);
    }
  }, [searchTerm, countries]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    setIsOpen(true);

    const exactMatch = countries.find(
      (country) => country.toLowerCase() === value.toLowerCase(),
    );
    if (exactMatch) {
      setSelectedCountry(exactMatch);
      setValue('country', exactMatch, { shouldValidate: true });
    } else {
      setSelectedCountry('');
      setValue('country', '', { shouldValidate: true });
    }
  };

  const handleCountrySelect = (country: string) => {
    setSearchTerm(country);
    setSelectedCountry(country);
    setIsOpen(false);
    setValue('country', country, { shouldValidate: true });
  };

  const handleInputFocus = () => {
    setIsOpen(true);
    if (selectedCountry === searchTerm) {
      setSearchTerm('');
    }
  };

  const handleInputBlur = () => {
    setTimeout(() => {
      setIsOpen(false);
      if (!countries.includes(searchTerm) && searchTerm !== '') {
        setSearchTerm(selectedCountry || '');
      }
    }, 200);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredCountries.length > 0) {
        handleCountrySelect(filteredCountries[0]);
      }
    }
  };

  return (
    <div className={styles.formGroup}>
      <div className={styles.countrySelectContainer}>
        <label htmlFor="countryInput">Country *</label>
        <input
          id="countryInput"
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          onKeyDown={handleInputKeyDown}
          placeholder="Start typing country name..."
          className={error ? `${styles.error}` : ''}
          autoComplete="off"
        />
        {isOpen && filteredCountries.length > 0 && (
          <div className={styles.countryDropdown}>
            {filteredCountries.map((country) => (
              <div
                key={country}
                className={styles.countryOption}
                onClick={() => handleCountrySelect(country)}
                onMouseDown={(e) => e.preventDefault()}>
                {country}
              </div>
            ))}
          </div>
        )}
        <div className={styles.errorView}>
          {error && <span className={styles.errorMessage}>{error}</span>}
        </div>
      </div>
    </div>
  );
}
