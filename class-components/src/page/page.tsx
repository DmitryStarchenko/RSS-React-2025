import { useEffect, useState } from 'react';
import { Pokemon, Results } from '../types';
import { Header } from './header';
import { CardList, FullList, Loader, NotFound } from './components';
import { Footer } from './footer';
import { apiRequest } from './api';
import { useLocalStorage } from '../shared';

export function Page() {
  const [list, setList] = useState<Results[]>([]);
  const [card, setCard] = useState<Pokemon>();
  const [error, setError] = useState(false);
  const [value] = useLocalStorage('');

  useEffect((): void => {
    apiRequest(typeof value === 'string' ? value : '')
      .then((response) => response.json())
      .then((response: Pokemon) =>
        value && response ? setCard(response) : setList(response.results),
      );
  }, []);

  const searchRequest = (searchString: string, pageNumber: number): void => {
    apiRequest(searchString, pageNumber)
      .then((response) => {
        if (
          Math.trunc(response.status / 100) === 4 ||
          Math.trunc(response.status / 100) === 5
        ) {
          setError(true);
        } else {
          setError(false);
          return response.json();
        }
      })
      .then((response: Pokemon) => {
        if (searchString.length) {
          setCard(response);
        } else {
          setCard(undefined);
          setList(response.results);
        }
      });
  };
  return (
    <>
      <Header searchRequest={searchRequest} />
      {error ? (
        <NotFound />
      ) : list.length || card ? (
        card ? (
          <CardList cards={card} />
        ) : (
          <FullList list={list} />
        )
      ) : (
        <Loader />
      )}
      <Footer />
    </>
  );
}
