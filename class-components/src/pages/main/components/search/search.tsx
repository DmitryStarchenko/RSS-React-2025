import styles from '../styles/search.module.css';
import {
  handleSearchRequest,
  useLocalStorage,
  CardContext,
} from '../../../../shared';
import { useContext } from 'react';

export function Search() {
  const KEY = 'SavePokemon';
  const [value, setValue] = useLocalStorage('', KEY);
  const { setList, setCard, setError } = useContext(CardContext);

  const props = {
    setList,
    setCard,
    setError,
  };

  const handleSearch = () => {
    handleSearchRequest(typeof value === 'string' ? value : '', 0, props);
  };

  return (
    <div className={styles.searchContent}>
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
        onClick={handleSearch}>
        Search
      </button>
    </div>
  );
}
