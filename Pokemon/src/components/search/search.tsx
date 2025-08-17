'use client';
import styles from '../styles/search.module.css';
import { useContext } from 'react';
import CardContext from '../../shared/context/card-context/context';
import { useLocalStorage } from '../../shared/custom-hooks/useLocalStorage';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';

export function Search() {
  const search = useTranslations('Search');
  const KEY = 'SavePokemon';
  const router = useRouter();
  const searchParams = useSearchParams();
  const [value, setValue] = useLocalStorage('', KEY);
  const { setParamsQuery } = useContext(CardContext);
  const params = new URLSearchParams(searchParams.toString());
  const paramsQuery = {
    name: typeof value === 'string' ? value : '',
    pageNumber: undefined,
  };

  const handleSearch = () => {
    setParamsQuery(paramsQuery);
    if (value === '') {
      router.push('/main');
      params.delete('card');
    } else {
      params.delete('page');
      handleAddSearchParams('card', value.toString());
    }
  };

  const handleAddSearchParams = (key: string, value: string) => {
    params.set(key, value);
    router.push(`?${params.toString()}`);
  };

  return (
    <div className={styles.searchContent}>
      <input
        className={styles.input}
        type="search"
        placeholder={search('placeholder')}
        onChange={(event) => {
          if (typeof setValue !== 'string') setValue(event.target.value);
        }}
        value={typeof value === 'string' ? value : ''}
      />
      <button
        className={styles.buttonSearch}
        type="submit"
        onClick={handleSearch}>
        {search('button')}
      </button>
    </div>
  );
}
