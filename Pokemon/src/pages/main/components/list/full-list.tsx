import { useContext, useEffect } from 'react';
import { useSearchParams } from 'react-router';
import styles from '../styles/full-list.module.css';
import { List } from '.';
import { CardContext } from '../../../../shared';
import { Pagination, Card } from '..';

export function FullList() {
  const {
    list,
    cardView,
    setCardView,
    setCurrentSearchParam,
    isLoadingDetails,
    setIsLoadingDetails,
  } = useContext(CardContext);
  const [searchParam] = useSearchParams();
  const pageParam = searchParam.get('page') || undefined;

  useEffect(() => {
    if (!pageParam) setCardView(false);
  }, [pageParam]);

  const handleClick = () => {
    setCardView(false);
    setCurrentSearchParam({ page: `${pageParam}` });
    setIsLoadingDetails(true);
  };

  const viewDetailsCard = () => {
    return (
      <>
        <div className={styles.detailsContent}>
          <Card />
          <button className={styles.buttonClose} onClick={handleClick}>
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
            <p data-testid="nameColumn" className={styles.nameColumn}>
              Name
            </p>
            <p
              data-testid="descriptionsColumn"
              className={styles.descriptionsColumn}>
              Descriptions
            </p>
          </div>
          {list.map((element) => {
            return <List key={element.name} {...element} />;
          })}
        </div>
        {cardView ? (
          isLoadingDetails ? (
            <h1 className={styles.loader}>Loading...</h1>
          ) : (
            viewDetailsCard()
          )
        ) : undefined}
      </main>
    </>
  );
}
