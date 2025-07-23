import { useEffect, useState } from 'react';
import styles from '../styles/page-button.module.css';

export function PageButton({
  searchRequest,
}: {
  searchRequest: (search: string, pageNumber: number) => void;
}) {
  const [pageNumber, setPageNumber] = useState(0);
  const [isLeftButtonDisabled, setIsLeftButtonDisabled] = useState(false);
  const [isRightButtonDisabled, setIsRightButtonDisabled] = useState(false);

  const increment = () => {
    setPageNumber(pageNumber + 40);
    searchRequest('', pageNumber);
  };

  const decrement = () => {
    setPageNumber(pageNumber > 0 ? pageNumber - 40 : 0);
    searchRequest('', pageNumber);
  };

  useEffect(() => {
    searchRequest('', pageNumber);
    if (pageNumber === 0) {
      setIsLeftButtonDisabled(true);
    } else {
      setIsLeftButtonDisabled(false);
    }
    if (pageNumber === 640) {
      setIsRightButtonDisabled(true);
    } else {
      setIsRightButtonDisabled(false);
    }
  }, [pageNumber]);

  return (
    <div className={styles.pageButton}>
      <button
        className={styles.buttonLeft}
        disabled={isLeftButtonDisabled}
        onClick={() => decrement()}>
        {'<<<'}
      </button>
      <button
        className={styles.buttonRight}
        disabled={isRightButtonDisabled}
        onClick={() => increment()}>
        {'>>>'}
      </button>
    </div>
  );
}
