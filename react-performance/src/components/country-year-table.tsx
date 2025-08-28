import { useState, useEffect } from 'react';
import type { CountryYearData, AvailableColumn } from '../shared/types/types';
import { formatValue } from './utils/format-value';
import { columnData, columnLabel } from './utils/column-data';
import styles from './styles/country-year-table.module.css';

interface CountryYearTableProps {
  countries: CountryYearData[];
  additionalColumns: AvailableColumn[];
}

export const CountryYearTable = ({
  countries,
  additionalColumns,
}: CountryYearTableProps) => {
  const [highlightedCountries, setHighlightedCountries] = useState<Set<string>>(
    new Set(),
  );

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
            {columnLabel(additionalColumns)}
          </tr>
        </thead>
        <tbody>
          {countries.map((country) => {
            const isHighlighted = highlightedCountries.has(country.country);

            return (
              <tr
                key={country.country}
                className={isHighlighted ? styles.highlighted : ''}>
                <td>{country.country}</td>
                <td>{country.iso_code || 'N/A'}</td>
                <td>{formatValue(country.population)}</td>
                <td>{formatValue(country.co2)}</td>
                <td>{formatValue(country.co2_per_capita)}</td>
                {columnData(additionalColumns, country)}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
