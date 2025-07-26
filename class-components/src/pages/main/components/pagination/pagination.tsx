import { useEffect, useState } from 'react';
import styles from '../styles/pagination.module.css';
import { handleSearchRequest } from '../../../../shared';
import { useContext } from 'react';
import { CardContext } from '../../../../shared';
import { useSearchParams } from 'react-router';

export function Pagination() {
  const MAX_PAGE = 15;
  const MIN_PAGE = 1;

  const [numberPage, setNumberPage] = useState(MIN_PAGE);
  const [isLeftButtonDisabled, setIsLeftButtonDisabled] = useState(false);
  const [isRightButtonDisabled, setIsRightButtonDisabled] = useState(false);
  const {
    setList,
    setCard,
    setError,
    currentSearchParam,
    setCurrentSearchParam,
  } = useContext(CardContext);
  const [searchParams, setSearchParams] = useSearchParams();

  const increment = () => {
    setNumberPage(numberPage + 1);
  };

  const decrement = () => {
    setNumberPage(numberPage > 1 ? numberPage - 1 : MIN_PAGE);
  };

  useEffect(() => {
    const currentParam = searchParams.get('page') || '1';
    setNumberPage(Number(currentParam));
  }, []);

  useEffect(() => {
    const props = {
      setList,
      setCard,
      setError,
    };
    handleSearchRequest('', numberPage - 1, props);
    if (numberPage === MIN_PAGE) {
      setIsLeftButtonDisabled(true);
    } else {
      setIsLeftButtonDisabled(false);
    }
    if (numberPage === MAX_PAGE) {
      setIsRightButtonDisabled(true);
    } else {
      setIsRightButtonDisabled(false);
    }
  }, [setCard, setError, setList, numberPage]);

  useEffect(() => {
    setCurrentSearchParam({ page: `${numberPage}` });
  }, [numberPage]);

  useEffect(() => {
    setSearchParams(currentSearchParam);
  }, [currentSearchParam]);
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
