import styles from './footer.module.css';
import pokebol from '../../../public/assets/pokebol.png';
import Image from 'next/image';

export default function Footer() {
  return (
    <div className={styles.footer}>
      <Image
        className={styles.pokebol}
        src={pokebol.src}
        width={100}
        height={100}
        alt="pokebol"
      />
    </div>
  );
}
