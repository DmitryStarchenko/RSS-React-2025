import { Fragment, memo } from 'react';
import { formatValue } from './format-value';
import type {
  AvailableColumn,
  Co2DataPoint,
  CountryData,
} from '../../shared/types/types';
import styles from '../styles/body-table.module.css';

type BodyTable = {
  setExpandedCountries: React.Dispatch<React.SetStateAction<Set<string>>>;
  sortedCountries: CountryData[];
  selectedYear: number;
  expandedCountries: Set<string>;
  highlightedData: Set<string>;
  selectedColumns: AvailableColumn[];
};

export const BodyTable = memo(
  ({
    setExpandedCountries,
    sortedCountries,
    selectedYear,
    expandedCountries,
    highlightedData,
    selectedColumns,
  }: BodyTable) => {
    const toggleExpand = (countryName: string) => {
      setExpandedCountries((data) => {
        const newSet = new Set(data);
        if (newSet.has(countryName)) {
          newSet.delete(countryName);
        } else {
          newSet.add(countryName);
        }
        return newSet;
      });
    };

    const getYearData = (
      country: CountryData,
      year: number,
    ): Co2DataPoint | null => {
      return country.data.find((data) => data.year === year) || null;
    };
    return (
      <tbody>
        {sortedCountries.map((country) => {
          const yearData = getYearData(country, selectedYear);
          const isExpanded = expandedCountries.has(country.country);
          const isHighlighted = highlightedData.has(country.country);

          return (
            <Fragment key={country.country}>
              <tr className={`${isHighlighted ? styles.highlighted : ''}`}>
                <td>
                  <button
                    className={styles.expandButton}
                    onClick={() => toggleExpand(country.country)}>
                    {isExpanded ? '▲' : '▼'}
                  </button>
                </td>
                <td>{country.country}</td>
                <td>{country.iso_code || 'N/A'}</td>
                <td>{formatValue(yearData?.population)}</td>
                <td>{formatValue(yearData?.co2)}</td>
                <td>{formatValue(yearData?.co2_per_capita)}</td>
                {selectedColumns.map((column) => (
                  <td key={column.key}>
                    {formatValue(yearData?.[column.key] as number | undefined)}
                  </td>
                ))}
              </tr>
              {isExpanded && (
                <tr
                  className={styles.expandedRow}
                  key={`${country.country}-expanded`}>
                  <td colSpan={7 + selectedColumns.length}>
                    <div className={styles.yearlyData}>
                      <h4>Yearly Data for {country.country}</h4>
                      <table className={styles.yearlyTable}>
                        <thead>
                          <tr>
                            <th>Year</th>
                            <th>Population</th>
                            <th>CO2</th>
                            <th>CO2 per Capita</th>
                            {selectedColumns.map((column) => (
                              <th key={column.key}>{column.label}</th>
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
                              {selectedColumns.map((column) => (
                                <td key={column.key}>
                                  {formatValue(
                                    yearData[column.key] as number | undefined,
                                  )}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </td>
                </tr>
              )}
            </Fragment>
          );
        })}
      </tbody>
    );
  },
);

BodyTable.displayName = 'BodyTable';
