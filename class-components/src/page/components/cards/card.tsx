import { ReactElement } from 'react';
import { Pokemon } from 'src/types';
import styles from '../styles/card.module.css';

export function Card(props: Pokemon): ReactElement {
  const data = props;
  const urlImage = data.sprites.other.dream_world.front_default;
  return (
    <div className={styles.card}>
      <div className={styles.imageConteiner}>
        {' '}
        <img className={styles.image} src={urlImage} alt={data.name} />
      </div>
      <h2>{data.name.toUpperCase()}</h2>
      <div className={styles.stats}>
        {data.stats.map((element) => (
          <p key={element.stat.name} className={styles.stat}>
            {element.stat.name.toUpperCase()}:{element.base_stat}
          </p>
        ))}
      </div>
    </div>
  );
}
