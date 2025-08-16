'use client';
import { useContext } from 'react';
import styles from '../styles/card.module.css';
import CardContext from '../../shared/context/card-context/context';
import { useTranslations } from 'next-intl';

export function Card() {
  const cardTranslation = useTranslations('Card');
  const { card } = useContext(CardContext);
  if (card) {
    const urlImage = card.sprites.other.dream_world.front_default;
    return (
      <div className={styles.card}>
        <div className={styles.imageContainer}>
          <img className={styles.image} src={urlImage} alt={card.name} />
        </div>
        <h2>{card.name.toUpperCase()}</h2>
        <div className={styles.stats}>
          {card.stats.map((element) => (
            <p key={element.stat.name} className={styles.stat}>
              {element.stat.name.toUpperCase()}:{element.base_stat}
            </p>
          ))}
        </div>
      </div>
    );
  } else {
    return (
      <div className={styles.card}>
        <h2>{cardTranslation('title')}</h2>
      </div>
    );
  }
}
