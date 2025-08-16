import { useTranslations } from 'next-intl';
import styles from '../styles/loader.module.css';

export function Loader() {
  const loader = useTranslations('Loader');

  return (
    <div className={styles.loader}>
      <h1>{loader('loading')}</h1>
    </div>
  );
}
