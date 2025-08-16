import { useTranslations } from 'next-intl';
import styles from '../styles/not-found.module.css';

export function NotFound() {
  const not = useTranslations('NotFound');
  return (
    <div className={styles.error}>
      <p className={styles.errorText}>{not('tittle')}</p>
    </div>
  );
}
