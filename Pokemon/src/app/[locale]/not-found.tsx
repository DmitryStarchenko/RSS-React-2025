import styles from '../../components/styles/error-boundary.module.css';
import image from '../../../public/assets/animation.gif';
import { Link } from '../../i18n/navigation';

export default function NotFound() {
  return (
    <div className={styles.error}>
      <p className={styles.errorText}>Not Found</p>
      <img className={styles.animation} src={image.src} alt="animation" />
      <Link href="/main">
        <button className={styles.buttonRefresh}>Back</button>
      </Link>
    </div>
  );
}
