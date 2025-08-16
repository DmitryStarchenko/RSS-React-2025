import Link from 'next/link';
import styles from '../components/styles/error-boundary.module.css';

export default function NotFound() {
  return (
    <div className={styles.error}>
      <p className={styles.errorText}>Not Found</p>
      <img
        className={styles.animation}
        src="../../../../assets/animation.gif"
        alt="animation"
      />
      <Link href="/main">
        <button className={styles.buttonRefresh}>Back</button>
      </Link>
    </div>
  );
}
