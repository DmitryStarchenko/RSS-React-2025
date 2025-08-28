import { useState, useEffect } from 'react';
import type {
  CountryData,
  Co2DataPoint,
  AvailableColumn,
} from '../shared/types/types';
import { formatValue } from './utils/format-value';
import { columnData } from './utils/column-data';
import styles from './styles/country-table.module.css';

interface CountryTableProps {
  countries: CountryData[];
  selectedYear: number;
  additionalColumns: AvailableColumn[];
}

export const CountryTable = ({
  countries,
  selectedYear,
  additionalColumns,
}: CountryTableProps) => {
  const [expandedCountry, setExpandedCountry] = useState<string | null>(null);
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

  const getYearData = (
    country: CountryData,
    year: number,
  ): Co2DataPoint | null => {
    return country.data.find((data) => data.year === year) || null;
  };

  const toggleExpand = (country: string) => {
    setExpandedCountry(expandedCountry === country ? null : country);
  };

  return (
    <div className={styles.countryTable}>
      {countries.map((country) => {
        const yearData = getYearData(country, selectedYear);
        const isHighlighted = highlightedData.has(country.country);

        return (
          <div
            key={country.country}
            className={`${styles.countryCard} ${isHighlighted ? styles.highlighted : ''}`}>
            <div
              className={styles.countryHeader}
              onClick={() => toggleExpand(country.country)}>
              <h3>{country.country}</h3>
              <span className={styles.isoCode}>
                {country.iso_code || 'N/A'}
              </span>
              <span className={styles.population}>
                Population: {formatValue(yearData?.population)}
              </span>
              <span className={styles.expandIcon}>
                {expandedCountry === country.country ? '▲' : '▼'}
              </span>
            </div>

            {expandedCountry === country.country && (
              <div className={styles.yearlyData}>
                <table>
                  <thead>
                    <tr>
                      <th>Year</th>
                      <th>Population</th>
                      <th>CO2</th>
                      <th>CO2 per Capita</th>
                      {additionalColumns
                        .filter((col) => col.selected)
                        .map((col) => (
                          <th key={col.key}>{col.label}</th>
                        ))}
                    </tr>
                  </thead>
                  <tbody>
                    {country.data.map((yearData) => (
                      <tr key={yearData.year}>
                        <td>{yearData.year}</td>
                        <td>{formatValue(yearData.population)}</td>
                        <td>{formatValue(yearData.co2)}</td>
                        <td>{formatValue(yearData.co2_per_capita)}</td>
                        {columnData(additionalColumns, yearData)}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
