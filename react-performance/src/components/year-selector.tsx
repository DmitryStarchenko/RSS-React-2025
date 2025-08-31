import { memo } from 'react';
import styles from './styles/year-selector.module.css';

interface YearSelectorProps {
  selectedYear: number;
  onYearChange: (year: number) => void;
  availableYears: number[];
}

export const YearSelector = memo(
  ({ selectedYear, onYearChange, availableYears }: YearSelectorProps) => {
    return (
      <div>
        <label className={styles.yearLabel} htmlFor="year-select">
          Select Year:{' '}
        </label>
        <select
          className={styles.yearSelect}
          id="year-select"
          value={selectedYear}
          onChange={(e) => onYearChange(Number(e.target.value))}>
          {availableYears.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
    );
  },
);

YearSelector.displayName = 'YearSelector';
