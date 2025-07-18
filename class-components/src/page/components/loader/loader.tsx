import { ReactElement } from 'react';
import styles from './loader.module.css';

export function Loader(): ReactElement {
  return (
    <div className={styles.loader}>
      <h1>Loading...</h1>
    </div>
  );
}
