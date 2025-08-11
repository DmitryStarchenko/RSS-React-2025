import { useContext, useEffect, useState } from 'react';
import { Pokemon } from '../../types';
import { Card, Loader, NotFound, Search } from '.';
import { apiRequest, CardContext, useLocalStorage } from '../../shared';
import { Outlet, useSearchParams } from 'react-router';

export function Main() {
  const KEY = 'SavePokemon';
  const [value] = useLocalStorage('', KEY);
  const { setList, setCard, setIsLoading, error, isLoading } =
    useContext(CardContext);
  const [searchParam] = useSearchParams();
  const [cardUrl, setCardUrl] = useState('');

  useEffect(() => {
    apiRequest(typeof value === 'string' ? value : '')
      .then((response) => response.json())
      .then((response: Pokemon) => {
        if (value && response) {
          setCard(response);
          setIsLoading(false);
        } else {
          setList(response.results);
          setIsLoading(false);
        }
      });
  }, []);

  useEffect(() => {
    setCardUrl(searchParam.get('card') || '');
  }, [searchParam]);

  return (
    <>
      <Search />
      {error ? (
        <NotFound />
      ) : isLoading ? (
        <Loader />
      ) : cardUrl === '' ? (
        <Outlet />
      ) : (
        <Card />
      )}
    </>
  );
}
