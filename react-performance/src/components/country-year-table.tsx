import { useState, useEffect, memo } from 'react';
import type { CountryYearData, AvailableColumn } from '../shared/types/types';
import { columnLabel } from './utils/column-data';
import styles from './styles/country-year-table.module.css';
import { CountryYearRow } from './utils/country-year-row';

interface CountryYearTableProps {
  countries: CountryYearData[];
  additionalColumns: AvailableColumn[];
}

export const CountryYearTable = memo(
  ({ countries, additionalColumns }: CountryYearTableProps) => {
    const [highlightedCountries, setHighlightedCountries] = useState<
      Set<string>
    >(new Set());

    useEffect(() => {
      const newHighlighted = new Set<string>();
      countries.forEach((country) => {
        newHighlighted.add(country.country);
      });

      setHighlightedCountries(newHighlighted);

      const timer = setTimeout(() => {
        setHighlightedCountries(new Set());
      }, 1000);

      return () => clearTimeout(timer);
    }, [countries]);

    const selectedColumns = additionalColumns.filter((col) => col.selected);

    return (
      <div className={styles.countryYearTable}>
        <table>
          <thead>
            <tr className={styles.countryYearTr}>
              <th>Country</th>
              <th>ISO Code</th>
              <th>Population</th>
              <th>CO2</th>
              <th>CO2 per Capita</th>
              {columnLabel(selectedColumns)}
            </tr>
          </thead>
          <tbody>
            {countries.map((country) => (
              <CountryYearRow
                key={country.country}
                country={country}
                additionalColumns={selectedColumns}
                isHighlighted={highlightedCountries.has(country.country)}
              />
            ))}
          </tbody>
        </table>
      </div>
    );
  },
);

CountryYearTable.displayName = 'CountryYearTable';
