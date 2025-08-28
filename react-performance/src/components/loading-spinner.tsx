import styles from './styles/loading-spinner.module.css';

export const LoadingSpinner = () => {
  return (
    <div className={styles.loadingSpinner}>
      <div className={styles.spinner}></div>
      <h2>Loading data...</h2>
    </div>
  );
};
