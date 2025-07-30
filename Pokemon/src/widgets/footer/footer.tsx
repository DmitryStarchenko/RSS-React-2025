import { useState } from 'react';
import styles from './footer.module.css';

export function Footer() {
  const [isError, setIsError] = useState(false);

  if (isError) {
    throw new Error('Произошла ошибка при нажатии на кнопку!');
  }
  return (
    <div className={styles.footer}>
      <button className={styles.errorButton} onClick={() => setIsError(true)}>
        Throw Error
      </button>
    </div>
  );
}
