import { useState, useMemo, useCallback } from 'react';
import { useData } from '../shared/hooks/use-data';
import type { AvailableColumn } from '../shared/types/types';
import { LoadingSpinner } from './loading-spinner';
import { YearSelector } from './year-selector';
import { SearchAndFilter } from './search-and-filter';
import { CountryTable } from './country-table';
import { DataModal } from './data-modal';
import { availableAdditionalColumns } from '../shared/constants';
import styles from './styles/main.module.css';

export const Main = () => {
  const { data, loading, error, getCountries, getAvailableYears } = useData();
  const [selectedYear, setSelectedYear] = useState(2023);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('country');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [additionalColumns, setAdditionalColumns] = useState<AvailableColumn[]>(
    availableAdditionalColumns,
  );

  const availableYears = useMemo(
    () => getAvailableYears(),
    [getAvailableYears],
  );
  const allCountries = useMemo(() => getCountries(), [getCountries]);

  const handleColumnToggle = useCallback((key: string) => {
    setAdditionalColumns((prev) =>
      prev.map((column) =>
        column.key === key ? { ...column, selected: !column.selected } : column,
      ),
    );
  }, []);

  const handleYearChange = useCallback((year: number) => {
    setSelectedYear(year);
  }, []);

  const handleSearchChange = useCallback((term: string) => {
    setSearchTerm(term);
  }, []);

  const handleSortChange = useCallback((sort: string) => {
    setSortBy(sort);
  }, []);

  const handleSortOrderChange = useCallback((order: 'asc' | 'desc') => {
    setSortOrder(order);
  }, []);

  const openModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  if (loading) return <LoadingSpinner />;
  if (error) return <div className={styles.error}>Error: {error}</div>;
  if (!data) return <div>No data available</div>;

  return (
    <div className={styles.app}>
      <header className={styles.appHeader}>
        <h1>CO2 Emissions by Country</h1>
        <div className={styles.controls}>
          <div className={styles.controlsFilters}>
            <SearchAndFilter
              searchTerm={searchTerm}
              onSearchChange={handleSearchChange}
              sortBy={sortBy}
              onSortChange={handleSortChange}
              sortOrder={sortOrder}
              onSortOrderChange={handleSortOrderChange}
            />
            <YearSelector
              selectedYear={selectedYear}
              onYearChange={handleYearChange}
              availableYears={availableYears}
            />
            <button className={styles.columnsButton} onClick={openModal}>
              Select Columns
            </button>
          </div>
        </div>
      </header>
      <main>
        <CountryTable
          countries={allCountries}
          selectedYear={selectedYear}
          additionalColumns={additionalColumns}
          searchTerm={searchTerm}
          sortBy={sortBy}
          sortOrder={sortOrder}
          onSortChange={handleSortChange}
          onSortOrderChange={handleSortOrderChange}
        />
      </main>
      <DataModal
        isOpen={isModalOpen}
        onClose={closeModal}
        availableColumns={additionalColumns}
        onColumnToggle={handleColumnToggle}
      />
    </div>
  );
};
