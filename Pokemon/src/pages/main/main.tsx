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
      if (data.results) {
        setList(data.results);
      } else {
        setCard(data);
        setIsLoadingDetails(false);
      }
    }
  }, [data, isLoading]);

  useEffect(() => {
    setCardUrl(searchParam.get('card') || '');
  }, [searchParam]);

  const renderContent = () => {
    if (error) return <NotFound />;
    if (isLoading) return <Loader />;
    if (cardUrl === '') return <Outlet />;
    if (card) return <Card />;
  };

  return (
    <>
      <Search />
      {renderContent()}
      <Popup />
    </>
  );
}
