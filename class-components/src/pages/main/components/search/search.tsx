import styles from '../styles/search.module.css';
import {
  handleSearchRequest,
  useLocalStorage,
  CardContext,
} from '../../../../shared';
import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router';

export function Search() {
  const KEY = 'SavePokemon';
  const [value, setValue] = useLocalStorage('', KEY);
  const { setList, setCard, setError, setCurrentSearchParam } =
    useContext(CardContext);
  const [searchParam, setSearchParam] = useSearchParams();
  const navigate = useNavigate();
  const [currentUrl, setCurrentUrl] = useState('');
  searchParam.get('page');

  const props = {
    setList,
    setCard,
    setError,
  };

  const handleSearch = () => {
    handleSearchRequest(typeof value === 'string' ? value : '', 0, props);
    setCurrentSearchParam('');
    setSearchParam('');
    if (value === '') {
      navigate('/');
    }
  };

  useEffect(() => {
    if (value === '') {
      console.log(currentUrl);
      setCurrentUrl('/');
      console.log(currentUrl);
    } else {
      console.log(currentUrl);
      setCurrentUrl(`/search/${value}`);
      console.log(currentUrl);
    }
  }, [value]);

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
      <Link to={currentUrl}>
        <button
          className={styles.buttonSearch}
          type="submit"
          onClick={handleSearch}>
          Search
        </button>
      </Link>
    </div>
  );
}
