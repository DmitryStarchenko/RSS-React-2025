import { useState, useEffect, memo } from 'react';
import type { CountryData, AvailableColumn } from '../shared/types/types';
import styles from './styles/country-table.module.css';
import { CountryCard } from './utils/country-card';

interface CountryTableProps {
  countries: CountryData[];
  selectedYear: number;
  additionalColumns: AvailableColumn[];
}

export const CountryTable = memo(
  ({ countries, selectedYear, additionalColumns }: CountryTableProps) => {
    const [highlightedData, setHighlightedData] = useState<Set<string>>(
      new Set(),
    );

    useEffect(() => {
      const newHighlighted = new Set<string>();
      countries.forEach((country) => {
        newHighlighted.add(country.country);
      });

      setHighlightedData(newHighlighted);

      const timer = setTimeout(() => {
        setHighlightedData(new Set());
      }, 1000);

      return () => clearTimeout(timer);
    }, [selectedYear, countries]);

    return (
      <div className={styles.countryTable}>
        {countries.map((country) => (
          <CountryCard
            key={country.country}
            country={country}
            selectedYear={selectedYear}
            additionalColumns={additionalColumns}
            isHighlighted={highlightedData.has(country.country)}
          />
        ))}
      </div>
    );
  },
);

CountryTable.displayName = 'CountryTable';
