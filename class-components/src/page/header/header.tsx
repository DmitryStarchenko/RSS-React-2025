import styles from './header.module.css';
import { useLocalStorage } from '../../shared';

export function Header({
  searchRequest,
}: {
  searchRequest: (search: string) => void;
}) {
  const [value, setValue] = useLocalStorage('');
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
          placeholder={'Enter ID (0-649) or name'}
          onChange={(event) => {
            if (typeof setValue !== 'string') setValue(event.target.value);
          }}
          value={typeof value === 'string' ? value : ''}
        />
        <button
          className={styles.buttonSearch}
          type="submit"
          onClick={() => {
            searchRequest(typeof value === 'string' ? value : '');
          }}>
          Search
        </button>
      </div>
    </header>
  );
}
