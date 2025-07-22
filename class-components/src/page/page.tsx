import { useEffect, useState } from 'react';
import { Pokemon, Results } from '../types';
import { Header } from './header';
import { CardList, FullList, Loader, NotFound } from './components';
import { Footer } from './footer';
import { apiRequest } from './api';

export function Page() {
  const [list, setList] = useState<Results[]>([]);
  const [card, setCard] = useState<Pokemon>();
  const [error, setError] = useState(false);

  useEffect((): void => {
    const idItem = localStorage.getItem('key');
    apiRequest(idItem)
      .then((response) => response.json())
      .then((response: Pokemon) =>
        idItem && response ? setCard(response) : setList(response.results),
      );
  }, []);

  const searchRequest = (searchString: string): void => {
    apiRequest(searchString)
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
        if (response && response.name) {
          localStorage.setItem('key', response.name);
        } else {
          localStorage.setItem('key', '');
        }
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
