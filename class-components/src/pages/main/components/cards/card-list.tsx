import { ReactElement } from 'react';
import { Pokemon } from '../../../../types';
import styles from '../styles/card-list.module.css';
import { Card } from '.';

export function CardList({ cards }: { cards: Pokemon }): ReactElement {
  return (
    <div className={styles.cardList}>{<Card key={cards.id} {...cards} />}</div>
  );
}
