'use client';
import styles from '../styles/search.module.css';
import { useContext } from 'react';
import CardContext from '../../shared/context/card-context/context';
import { useLocalStorage } from '../../shared/custom-hooks/useLocalStorage';

export function Search() {
  const KEY = 'SavePokemon';
  const [value, setValue] = useLocalStorage('', KEY);
  const { setCurrentSearchParam, setParamsQuery } = useContext(CardContext);
  const paramsQuery = {
    name: typeof value === 'string' ? value : '',
    pageNumber: undefined,
  };

  const handleSearch = () => {
    setParamsQuery(paramsQuery);
    if (value === '') {
      setCurrentSearchParam({});
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
