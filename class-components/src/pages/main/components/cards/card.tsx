import { ReactElement } from 'react';
import { Pokemon } from '../../../../types';
import styles from '../styles/card.module.css';

export function Card({ cards }: { cards: Pokemon }): ReactElement {
  const urlImage = cards.sprites.other.dream_world.front_default;
  return (
    <div className={styles.card}>
      <div className={styles.imageConteiner}>
        {' '}
        <img className={styles.image} src={urlImage} alt={cards.name} />
      </div>
      <h2>{cards.name.toUpperCase()}</h2>
      <div className={styles.stats}>
        {cards.stats.map((element) => (
          <p key={element.stat.name} className={styles.stat}>
            {element.stat.name.toUpperCase()}:{element.base_stat}
          </p>
        ))}
      </div>
    </div>
  );
}
