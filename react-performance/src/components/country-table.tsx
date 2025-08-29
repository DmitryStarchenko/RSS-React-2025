import { useState, useEffect, memo, useMemo } from 'react';
import type { CountryData, AvailableColumn } from '../shared/types/types';
import { filterCountries } from './utils/filter-countries';
import styles from './styles/country-table.module.css';
import { BodyTable } from './utils/body-table';

interface CountryTableProps {
  countries: CountryData[];
  selectedYear: number;
  additionalColumns: AvailableColumn[];
  searchTerm: string;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
  onSortChange: (sortBy: string) => void;
  onSortOrderChange: (order: 'asc' | 'desc') => void;
}

export const CountryTable = memo(
  ({
    countries,
    selectedYear,
    additionalColumns,
    searchTerm,
    sortBy,
    sortOrder,
    onSortChange,
    onSortOrderChange,
  }: CountryTableProps) => {
    const [highlightedData, setHighlightedData] = useState<Set<string>>(
      new Set(),
    );
    const [expandedCountries, setExpandedCountries] = useState<Set<string>>(
      new Set(),
    );

    const filteredCountries = useMemo(() => {
      return filterCountries(countries, searchTerm);
    }, [countries, searchTerm]);

    const sortedCountries = useMemo(() => {
      return [...filteredCountries].sort((a, b) => {
        const getSortValue = (country: CountryData) => {
          const yearData = country.data.find((d) => d.year === selectedYear);

          switch (sortBy) {
            case 'population':
              return yearData?.population ?? 0;
            case 'co2':
              return yearData?.co2 ?? 0;
            case 'co2_per_capita':
              return yearData?.co2_per_capita ?? 0;
            default:
              return country.country.toLowerCase();
          }
        };

        const aValue = getSortValue(a);
        const bValue = getSortValue(b);

        if (sortOrder === 'asc') {
          return aValue > bValue ? 1 : -1;
        } else {
          return aValue < bValue ? 1 : -1;
        }
      });
    }, [filteredCountries, selectedYear, sortBy, sortOrder]);

    useEffect(() => {
      const newHighlighted = new Set<string>();
      sortedCountries.forEach((country) => {
        newHighlighted.add(country.country);
      });

      setHighlightedData(newHighlighted);

      const timer = setTimeout(() => {
        setHighlightedData(new Set());
      }, 1000);

      return () => clearTimeout(timer);
    }, [selectedYear, sortedCountries]);

    const selectedColumns = additionalColumns.filter(
      (column) => column.selected,
    );

    const SortableHeader = ({
      columnKey,
      label,
    }: {
      columnKey: string;
      label: string;
    }) => (
      <th
        className={styles.sortableHeader}
        onClick={() => {
          if (sortBy === columnKey) {
            onSortOrderChange(sortOrder === 'asc' ? 'desc' : 'asc');
          } else {
            onSortChange(columnKey);
          }
        }}>
        {label}
      </th>
    );

    return (
      <div className={styles.countryTable}>
        <table className={styles.mainTable}>
          <thead>
            <tr>
              <th></th>
              <th>Country</th>
              <th>ISO Code</th>
              <SortableHeader columnKey="population" label="Population" />
              <SortableHeader columnKey="co2" label="CO2" />
              <SortableHeader
                columnKey="co2_per_capita"
                label="CO2 per Capita"
              />
              {selectedColumns.map((column) => (
                <th key={column.key}>{column.label}</th>
              ))}
            </tr>
          </thead>
          <BodyTable
            setExpandedCountries={setExpandedCountries}
            sortedCountries={sortedCountries}
            selectedYear={selectedYear}
            expandedCountries={expandedCountries}
            highlightedData={highlightedData}
            selectedColumns={selectedColumns}
          />
        </table>
      </div>
    );
  },
);

CountryTable.displayName = 'CountryTable';
