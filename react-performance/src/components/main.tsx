import { useState } from 'react';
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

  const availableYears = getAvailableYears();
  const allCountries = getCountries();
  const countriesByYear = getCountriesByYear(selectedYear);
  const filteredAndSortedCountries = getFilteredAndSortedCountries(
    allCountries,
    countriesByYear,
    searchTerm,
    showYearlyData,
    sortBy,
    sortOrder,
    selectedYear,
  );

  const handleColumnToggle = (key: string) => {
    setAdditionalColumns((prev) =>
      prev.map((column) =>
        column.key === key ? { ...column, selected: !column.selected } : column,
      ),
    );
  };

  const handleYearChange = (year: number) => {
    setSelectedYear(year);
    setShowYearlyData(false);
  };

  const toggleViewMode = () => {
    setShowYearlyData(!showYearlyData);
  };

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
              onSearchChange={setSearchTerm}
              sortBy={sortBy}
              onSortChange={setSortBy}
              sortOrder={sortOrder}
              onSortOrderChange={setSortOrder}
              showYearlyData={showYearlyData}
            />
            {showYearlyData ? undefined : (
              <>
                <YearSelector
                  selectedYear={selectedYear}
                  onYearChange={handleYearChange}
                  availableYears={availableYears}
                />
                <button
                  className={styles.columnsButton}
                  onClick={() => setIsModalOpen(true)}>
                  Select Columns
                </button>
              </>
            )}
          </div>
        </div>
      </header>
      <main>
        {showYearlyData ? (
          <CountryTable
            countries={filteredAndSortedCountries as CountryData[]}
            selectedYear={selectedYear}
            additionalColumns={additionalColumns}
          />
        ) : (
          <CountryYearTable
            countries={filteredAndSortedCountries as CountryYearData[]}
            additionalColumns={additionalColumns}
          />
        )}
      </main>
      <DataModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        availableColumns={additionalColumns}
        onColumnToggle={handleColumnToggle}
      />
    </div>
  );
};
