import { ReactElement, useContext } from 'react';
import styles from '../styles/full-list.module.css';
import { List } from '.';
import { CardContext } from '../../../../shared';
import { Pagination } from '../pagination';
import { Card } from '..';

export function FullList() {
  const { list, cardView } = useContext(CardContext);

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
        {cardView ? <Card /> : undefined}
      </main>
    </>
  );
}
