import styles from '../../components/styles/error-boundary.module.css';
import image from '../../../public/assets/animation.gif';
import { Link } from '../../i18n/navigation';
import { useTranslations } from 'next-intl';

export default function NotFound() {
  const not = useTranslations('NotFound');
  return (
    <div className={styles.error}>
      <p className={styles.errorText}>{not('tittle')}</p>
      <img className={styles.animation} src={image.src} alt="animation" />
      <Link href="/main">
        <button className={styles.buttonRefresh}>{not('button')}</button>
      </Link>
    </div>
  );
}
