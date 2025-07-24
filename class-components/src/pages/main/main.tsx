import { useContext, useEffect } from 'react';
import { Pokemon } from '../../types';
import { Card, FullList, Loader, NotFound, Search } from './components';
import { apiRequest, CardContext, useLocalStorage } from '../../shared';

export function Main() {
  const KEY = 'SavePokemon';
  const [value] = useLocalStorage('', KEY);
  const { setList, setCard, setIsLoading, isLoading, error, card, list } =
    useContext(CardContext);

  useEffect((): void => {
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

  return (
    <>
      <Search />
      {error ? (
        <NotFound />
      ) : isLoading ? (
        <Loader />
      ) : card ? (
        <Card cards={card} />
      ) : (
        <FullList list={list} />
      )}
    </>
  );
}
