import styles from './header.module.css';
import { useLocalStorage } from '../../../shared';
import { PageButton } from '../components';

export function Header({
  searchRequest,
}: {
  searchRequest: (search: string, pageNumber?: number) => void;
}) {
  const [value, setValue] = useLocalStorage('');
  return (
    <header className={styles.header}>
      <div className={styles.conteinerLogo}>
        <img
          className={styles.logo}
          src="../../public/assets/Pikachu.webp"
          alt="pikachu"
        />
        <a href="about">
          <img
            className={styles.dialogBuble}
            src="../../../assets/dialogue-bubble.png"
            alt="dialogue-bubble"
          />
        </a>
      </div>
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
      <PageButton searchRequest={searchRequest} />
    </header>
  );
}
