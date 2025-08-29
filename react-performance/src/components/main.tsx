import { useState, useMemo, useCallback } from 'react';
import { useData } from '../shared/hooks/use-data';
import type {
  AvailableColumn,
  CountryData,
  CountryYearData,
} from '../shared/types/types';
import { LoadingSpinner } from './loading-spinner';
import { YearSelector } from './year-selector';
import { SearchAndFilter } from './search-and-filter';
import { CountryTable } from './country-table';
import { CountryYearTable } from './country-year-table';
import { DataModal } from './data-modal';
import { getFilteredAndSortedCountries } from './utils/get-filtered-and-sorted-countries';
import { availableAdditionalColumns } from '../shared/constants';
import styles from './styles/main.module.css';

export const Main = () => {
  const {
    data,
    loading,
    error,
    getCountries,
    getCountriesByYear,
    getAvailableYears,
  } = useData();
  const [selectedYear, setSelectedYear] = useState(2023);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('country');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [additionalColumns, setAdditionalColumns] = useState<AvailableColumn[]>(
    availableAdditionalColumns,
  );
  const [showYearlyData, setShowYearlyData] = useState(true);

  const availableYears = useMemo(
    () => getAvailableYears(),
    [getAvailableYears],
  );
  const allCountries = useMemo(() => getCountries(), [getCountries]);
  const countriesByYear = useMemo(
    () => getCountriesByYear(selectedYear),
    [getCountriesByYear, selectedYear],
  );

  const filteredAndSortedCountries = useMemo(
    () =>
      getFilteredAndSortedCountries(
        allCountries,
        countriesByYear,
        searchTerm,
        showYearlyData,
        sortBy,
        sortOrder,
        selectedYear,
      ),
    [
      allCountries,
      countriesByYear,
      searchTerm,
      showYearlyData,
      sortBy,
      sortOrder,
      selectedYear,
    ],
  );

  const selectedAdditionalColumns = useMemo(
    () => additionalColumns.filter((col) => col.selected),
    [additionalColumns],
  );

  const handleColumnToggle = useCallback((key: string) => {
    setAdditionalColumns((prev) =>
      prev.map((column) =>
        column.key === key ? { ...column, selected: !column.selected } : column,
      ),
    );
  }, []);

  const handleYearChange = useCallback((year: number) => {
    setSelectedYear(year);
    setShowYearlyData(false);
  }, []);

  const toggleViewMode = useCallback(() => {
    setShowYearlyData((prev) => !prev);
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
          <button className={styles.viewToggle} onClick={toggleViewMode}>
            {showYearlyData ? 'Show Single Year' : 'Show All Years'}
          </button>
          <div className={styles.controlsFilters}>
            <SearchAndFilter
              searchTerm={searchTerm}
              onSearchChange={handleSearchChange}
              sortBy={sortBy}
              onSortChange={handleSortChange}
              sortOrder={sortOrder}
              onSortOrderChange={handleSortOrderChange}
              showYearlyData={showYearlyData}
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
        {showYearlyData ? (
          <CountryTable
            countries={filteredAndSortedCountries as CountryData[]}
            selectedYear={selectedYear}
            additionalColumns={selectedAdditionalColumns}
          />
        ) : (
          <CountryYearTable
            countries={filteredAndSortedCountries as CountryYearData[]}
            additionalColumns={selectedAdditionalColumns}
          />
        )}
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
