import styles from './footer.module.css';

export function Footer() {
  return (
    <div className={styles.footer}>
      <img
        className={styles.pokebol}
        src="../../../assets/pokebol.png"
        alt="pokebol"
      />
    </div>
  );
}
