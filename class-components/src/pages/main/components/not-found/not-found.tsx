import styles from '../styles/not-found.module.css';

export function NotFound() {
  return (
    <div className={styles.error}>
      <p className={styles.errorText}>Not Found</p>
    </div>
  );
}
