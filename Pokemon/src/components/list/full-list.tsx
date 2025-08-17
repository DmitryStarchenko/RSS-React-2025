'use client';
import { useContext, useEffect } from 'react';
import styles from '../styles/full-list.module.css';
import CardContext from '../../shared/context/card-context/context';
import { Card } from '../cards/card';
import { Pagination } from '../pagination/pagination';
import { List } from './list';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';

export function FullList() {
  const fullList = useTranslations('FullList');
  const { list, cardView, setCardView, isLoadingDetails, setIsLoadingDetails } =
    useContext(CardContext);
  const router = useRouter();
  const searchParams = useSearchParams();
  const pageParams = searchParams.get('page') || undefined;

  useEffect(() => {
    if (!pageParams) setCardView(false);
  }, [pageParams]);

  const handleClick = () => {
    setCardView(false);
    handleDeleteParams();
    setIsLoadingDetails(true);
  };

  const handleDeleteParams = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete('details');
    router.push(`?${params.toString()}`);
  };

  const viewDetailsCard = () => {
    return (
      <div className={styles.detailsContent}>
        <Card />
        <button className={styles.buttonClose} onClick={handleClick}>
          {fullList('button')}
        </button>
      </div>
    );
  };

  return (
    <>
      <Pagination />
      <main className={styles.main}>
        <div className={styles.cardList}>
          <div className={styles.headerList}>
            <p className={styles.nameColumn}>{fullList('name')}</p>
            <p className={styles.descriptionsColumn}>
              {fullList('descriptions')}
            </p>
          </div>
          {list.map((element) => {
            return <List key={element.name} {...element} />;
          })}
        </div>
        {cardView ? (
          isLoadingDetails ? (
            <h1 className={styles.loader}>{fullList('loading')}</h1>
          ) : (
            viewDetailsCard()
          )
        ) : undefined}
      </main>
    </>
  );
}
