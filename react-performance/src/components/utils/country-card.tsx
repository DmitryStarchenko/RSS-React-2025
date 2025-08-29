import { memo, useState } from 'react';
import type {
  AvailableColumn,
  Co2DataPoint,
  CountryData,
} from '../../shared/types/types';
import { formatValue } from './format-value';
import { columnData } from './column-data';
import styles from '../styles/county-card.module.css';

export const CountryCard = memo(
  ({
    country,
    selectedYear,
    additionalColumns,
    isHighlighted,
  }: {
    country: CountryData;
    selectedYear: number;
    additionalColumns: AvailableColumn[];
    isHighlighted: boolean;
  }) => {
    const [expanded, setExpanded] = useState(false);

    const getYearData = (year: number): Co2DataPoint | null => {
      return country.data.find((data) => data.year === year) || null;
    };

    const toggleExpand = () => {
      setExpanded((prev) => !prev);
    };

    const yearData = getYearData(selectedYear);

    return (
      <div
        className={`${styles.countryCard} ${isHighlighted ? styles.highlighted : ''}`}>
        <div className={styles.countryHeader} onClick={toggleExpand}>
          <h3>{country.country}</h3>
          <span className={styles.isoCode}>{country.iso_code || 'N/A'}</span>
          <span className={styles.population}>
            Population: {formatValue(yearData?.population)}
          </span>
          <span className={styles.expandIcon}>{expanded ? '▲' : '▼'}</span>
        </div>

        {expanded && (
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
  },
);

CountryCard.displayName = 'CountryCard';
