import { useContext } from 'react';
import styles from '../styles/card.module.css';
import { CardContext } from '../../../../shared';
import { useSearchParams } from 'react-router';

export function Card() {
  const { card, setCardView } = useContext(CardContext);
  const [searchParam] = useSearchParams();
  const pageParam = searchParam.get('page');
  const urlImage = card.sprites.other.dream_world.front_default;

  return (
    <div className={styles.card}>
      {pageParam ? (
        <button className={styles.buttonClose} onClick={setCardView(false)}>
          Close
        </button>
      ) : null}
      <div className={styles.imageConteiner}>
        {' '}
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
}
