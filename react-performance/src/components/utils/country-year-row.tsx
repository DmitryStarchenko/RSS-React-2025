import { memo } from 'react';
import type {
  AvailableColumn,
  CountryYearData,
} from '../../shared/types/types';
import { formatValue } from './format-value';
import { columnData } from './column-data';
import styles from '../styles/country-year-row.module.css';

export const CountryYearRow = memo(
  ({
    country,
    additionalColumns,
    isHighlighted,
  }: {
    country: CountryYearData;
    additionalColumns: AvailableColumn[];
    isHighlighted: boolean;
  }) => {
    return (
      <tr className={isHighlighted ? styles.highlighted : ''}>
        <td>{country.country}</td>
        <td>{country.iso_code || 'N/A'}</td>
        <td>{formatValue(country.population)}</td>
        <td>{formatValue(country.co2)}</td>
        <td>{formatValue(country.co2_per_capita)}</td>
        {columnData(additionalColumns, country)}
      </tr>
    );
  },
);

CountryYearRow.displayName = 'CountryYearRow';
