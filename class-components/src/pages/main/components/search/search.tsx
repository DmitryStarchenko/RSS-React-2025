import styles from '../styles/search.module.css';
import {
  handleSearchRequest,
  useLocalStorage,
  CardContext,
} from '../../../../shared';
import { useContext } from 'react';
import { useSearchParams } from 'react-router';

export function Search() {
  const KEY = 'SavePokemon';
  const [value, setValue] = useLocalStorage('', KEY);
  const [searchParam, setSearchParam] = useSearchParams();
  const { setList, setCard, setError, setCurrentSearchParam } =
    useContext(CardContext);
  const props = {
    setList,
    setCard,
    setError,
  };
  searchParam.get('page');

  const handleSearch = () => {
    handleSearchRequest(typeof value === 'string' ? value : '', 0, props);
    if (value === '') {
      setCurrentSearchParam('');
      setSearchParam('');
    } else {
      setCurrentSearchParam({ card: `${value}` });
    }
  };

  return (
    <div className={styles.searchContent}>
      <input
        className={styles.input}
        type="search"
        placeholder={'Enter ID (1-640) or name'}
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
