import { useRef, useState } from 'react';
import styles from '../../../shared/form.module.css';
import { useAppSelector } from '../../../shared/store/store';
import { RootState } from 'components/controlled-form/types';
import { FormData } from '../../../globalTypes';

type Props = {
  countryRef: React.RefObject<HTMLInputElement>;
  fieldErrors: Partial<Record<keyof FormData, string>>;
};

export function Country({ countryRef, fieldErrors }: Props) {
  const countrySelectRef = useRef(countryRef);
  const countries = useAppSelector((state: RootState) => state.countries.list);
  const [filteredCountries, setFilteredCountries] =
    useState<string[]>(countries);
  const [showDropdown, setShowDropdown] = useState(false);

  const selectCountry = (country: string) => {
    if (countryRef.current) {
      countrySelectRef.current.current.value = country;
      setShowDropdown(false);
    }
  };

  const handleCountryInput = () => {
    if (countryRef.current) {
      const inputValue = countryRef.current.value.toLowerCase();
      const filtered = countries.filter((country) =>
        country.toLowerCase().includes(inputValue),
      );
      setFilteredCountries(filtered);
      setShowDropdown(true);
    }
  };

  return (
    <div className={styles.formGroup}>
      <div className={styles.countrySelectContainer}>
        <label htmlFor="countryInput">Country *</label>
        <input
          ref={countryRef}
          id="countryInput"
          type="text"
          onInput={handleCountryInput}
          onFocus={() => setShowDropdown(true)}
          placeholder="Start typing country name..."
        />
        {showDropdown && filteredCountries.length > 0 && (
          <div className={styles.countryDropdown}>
            {filteredCountries.map((country) => (
              <div
                key={country}
                className={styles.countryOption}
                onClick={() => selectCountry(country)}
                onMouseDown={(e) => e.preventDefault()}>
                {country}
              </div>
            ))}
          </div>
        )}
        <div className={styles.errorView}>
          <span id="country-error" className={styles.errorMessage}>
            {fieldErrors ? fieldErrors.country : ''}
          </span>
        </div>
      </div>
    </div>
  );
}
