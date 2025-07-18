import { ReactElement } from 'react';
import styles from './not-found.module.css';

export function NotFound(): ReactElement {
  return (
    <div className={styles.error}>
      <p className={styles.errorText}>Not Found</p>
    </div>
  );
}
