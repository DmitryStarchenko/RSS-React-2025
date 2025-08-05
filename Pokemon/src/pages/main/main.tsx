import { useContext, useEffect, useState } from 'react';
import { Outlet, useSearchParams } from 'react-router';
import { Card, Loader, NotFound, Search, Popup } from '.';
import { CardContext, useGetPokemonQuery } from '../../shared';

export function Main() {
  const { card, setList, setCard, paramsQuery, setIsLoadingDetails } =
    useContext(CardContext);
  const [searchParam] = useSearchParams();
  const [cardUrl, setCardUrl] = useState('');
  const { data, error, isLoading } = useGetPokemonQuery(paramsQuery);

  useEffect(() => {
    if (!isLoading) {
      if (Array.isArray(data.results)) {
        setList(data.results);
      } else {
        setCard(data);
        setIsLoadingDetails(false);
      }
    }
  }, [data, isLoading, setCard, setList]);

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
      ) : card ? (
        <Card />
      ) : (
        <Loader />
      )}
      <Popup />
    </>
  );
}
