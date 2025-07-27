import { ReactElement, useContext, useEffect, useState } from 'react';
import styles from '../styles/full-list.module.css';
import { List } from '.';
import { CardContext } from '../../../../shared';
import { Pagination } from '../pagination';
import { Card, Loader } from '..';
import { useSearchParams } from 'react-router';

export function FullList() {
  const { list, card, cardView, setCardView, setCurrentSearchParam } =
    useContext(CardContext);
  const [searchParam] = useSearchParams();
  const pageParam = searchParam.get('page');
  const [isLoadingCard, setIsLoadingCard] = useState(true);

  useEffect(() => {
    setIsLoadingCard(false);
  }, [card]);

  const viewDetailsCard = () => {
    return (
      <>
        <div className={styles.detailsContent}>
          {isLoadingCard ? <Loader /> : <Card />}
          <button
            className={styles.buttonClose}
            onClick={() => {
              setCardView(false);
              setCurrentSearchParam({ page: `${pageParam}` });
            }}>
            CLOSE
          </button>
        </div>
      </>
    );
  };

  return (
    <>
      <Pagination />
      <main className={styles.main}>
        <div className={styles.cardList}>
          <div className={styles.headerList}>
            <p className={styles.nameColumn}>Name</p>
            <p className={styles.descriptionsColumn}>Descriptions</p>
          </div>
          {list.map((element): ReactElement => {
            return <List key={element.name} {...element} />;
          })}
        </div>
        {cardView ? viewDetailsCard() : undefined}
      </main>
    </>
  );
}
