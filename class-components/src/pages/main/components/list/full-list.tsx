import { ReactElement } from 'react';
import styles from '../styles/full-list.module.css';
import { Results } from '../../../../types';
import { List } from '.';

export function FullList({ list }: { list: Results[] }): ReactElement {
  return (
    <main className={styles.cardList}>
      <div className={styles.headerList}>
        <p className={styles.nameColumn}>Name</p>
        <p className={styles.descriptionsColumn}>Descriptions</p>
      </div>
      {list.map((element): ReactElement => {
        return <List key={element.name} {...element} />;
      })}
    </main>
  );
}
