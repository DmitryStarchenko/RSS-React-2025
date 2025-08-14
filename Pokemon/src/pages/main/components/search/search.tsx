import { useContext } from 'react';
import { useSearchParams } from 'react-router';
import styles from '../styles/search.module.css';
import { useLocalStorage, CardContext } from '../../../../shared';

export function Search() {
  const KEY = 'SavePokemon';
  const [value, setValue] = useLocalStorage('', KEY);
  const [searchParam, setSearchParam] = useSearchParams();
  const { setCurrentSearchParam, setParamsQuery } = useContext(CardContext);
  searchParam.get('page');
  const paramsQuery = {
    name: typeof value === 'string' ? value : '',
    pageNumber: undefined,
  };

  const handleSearch = () => {
    setParamsQuery(paramsQuery);
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
