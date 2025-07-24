import { useEffect, useState } from 'react';
import styles from '../styles/pagination.module.css';
import { handleSearchRequest } from '../../../../shared';
import { useContext } from 'react';
import { CardContext } from '../../../../shared';
import { useSearchParams } from 'react-router';

export function Pagination() {
  const [countLinesShown, setCountLinesShown] = useState(0);
  const [numberPage, setNumberPage] = useState(0);
  const [isLeftButtonDisabled, setIsLeftButtonDisabled] = useState(false);
  const [isRightButtonDisabled, setIsRightButtonDisabled] = useState(false);
  const { setList, setCard, setError } = useContext(CardContext);
  const [searchParam, setSearchParam] = useSearchParams();

  const increment = () => {
    setCountLinesShown(countLinesShown + 40);
  };

  const decrement = () => {
    setCountLinesShown(countLinesShown > 0 ? countLinesShown - 40 : 0);
  };

  useEffect(() => {
    const props = {
      setList,
      setCard,
      setError,
    };
    handleSearchRequest('', countLinesShown, props);
    if (countLinesShown === 0) {
      setIsLeftButtonDisabled(true);
    } else {
      setIsLeftButtonDisabled(false);
    }
    if (countLinesShown === 640) {
      setIsRightButtonDisabled(true);
    } else {
      setIsRightButtonDisabled(false);
    }
    setNumberPage(countLinesShown / 40 + 1);
    setSearchParam(`page=${numberPage}`);
  }, [
    countLinesShown,
    numberPage,
    searchParam,
    setCard,
    setError,
    setList,
    setSearchParam,
  ]);

  return (
    <div className={styles.pageButton}>
      <button
        className={styles.buttonLeft}
        disabled={isLeftButtonDisabled}
        onClick={() => {
          decrement();
        }}>
        {'<<<'}
      </button>
      <span className={styles.numberPage}>{`Page ${numberPage}`}</span>
      <button
        className={styles.buttonRight}
        disabled={isRightButtonDisabled}
        onClick={() => {
          increment();
        }}>
        {'>>>'}
      </button>
    </div>
  );
}
