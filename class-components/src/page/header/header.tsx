import { useState } from 'react';
import styles from './header.module.css';

export function Header({
  searchRequest,
}: {
  searchRequest: (search: string) => void;
}) {
  const [search, setSearch] = useState('');

  const idItem = localStorage.getItem('key');
  return (
    <header className={styles.header}>
      <img
        className={styles.mainLogo}
        src="../../public/assets/Pikachu.webp"
        alt="pikachu"
      />
      <div className={styles.headerContent}>
        <input
          className={styles.input}
          type="search"
          placeholder={
            idItem ? `Opened card ${idItem}` : 'Enter ID (0-649) or name'
          }
          onChange={(event) => {
            setSearch(event.target.value);
          }}
        />
        <button
          className={styles.buttonSearch}
          type="submit"
          onClick={() => {
            searchRequest(search);
          }}>
          Search
        </button>
      </div>
    </header>
  );
}
