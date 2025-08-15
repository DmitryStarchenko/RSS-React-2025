import styles from './footer.module.css';
import pokebol from '../../../public/assets/pokebol.png';

export default function Footer() {
  return (
    <div className={styles.footer}>
      <img className={styles.pokebol} src={pokebol.src} alt="pokebol" />
    </div>
  );
}
