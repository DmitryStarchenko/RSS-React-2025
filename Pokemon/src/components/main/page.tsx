'use client';
import { useContext, useEffect, useState } from 'react';
import styles from './main.module.css';
import { useSearchParams } from 'next/navigation';
import { NotFound } from '../not-found/not-found';
import { Loader } from '../loader/loader';
import { Card } from '../cards/card';
import { Search } from '../search/search';
import { Popup } from '../popup/popup';
import CardContext from '../../shared/context/card-context/context';
import { useGetPokemonQuery } from '../../shared/store/services/api';
import { FullList } from '../list/full-list';

export default function Main() {
  const { card, list, setList, setCard, paramsQuery, setIsLoadingDetails } =
    useContext(CardContext);
  const searchParam = useSearchParams();
  const [cardUrl, setCardUrl] = useState('');
  const { data, error, isLoading, refetch } = useGetPokemonQuery(paramsQuery);

  useEffect(() => {
    if (!isLoading) {
      if (data && data.results) {
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
    if (list) return <FullList />;
    if (card) return <Card />;
  };

  return (
    <>
      <Search />
      <button className={styles.refetch} onClick={() => refetch()}>
        Refetch
      </button>
      {renderContent()}
      <Popup />
    </>
  );
}
