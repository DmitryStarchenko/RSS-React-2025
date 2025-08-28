import styles from './styles/search-and-filter.module.css';

interface SearchAndFilterProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
  sortOrder: 'asc' | 'desc';
  onSortOrderChange: (order: 'asc' | 'desc') => void;
  showYearlyData?: boolean;
}

export const SearchAndFilter = ({
  searchTerm,
  onSearchChange,
  sortBy,
  onSortChange,
  sortOrder,
  onSortOrderChange,
  showYearlyData = false,
}: SearchAndFilterProps) => {
  return (
    <div className={styles.searchFilter}>
      <input
        className={styles.searchInput}
        type="text"
        placeholder="Search countries..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />

      <div className={styles.sortGroup}>
        <select
          className={styles.sortSelect}
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}>
          <option value="country">Name</option>
          <option value="population">Population</option>
          {!showYearlyData && (
            <>
              <option value="co2">CO2</option>
              <option value="co2_per_capita">CO2 per Capita</option>
            </>
          )}
        </select>

        <button
          className={styles.sortButton}
          onClick={() =>
            onSortOrderChange(sortOrder === 'asc' ? 'desc' : 'asc')
          }>
          {sortOrder === 'asc' ? '↑' : '↓'}
        </button>
      </div>
    </div>
  );
};
