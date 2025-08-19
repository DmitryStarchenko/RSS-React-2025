import { useEffect, useState, useContext } from 'react';
import { useSearchParams } from 'react-router';
import styles from '../styles/pagination.module.css';
import { CardContext } from '../../../../shared';

export function Pagination() {
  const MAX_PAGE = 15;
  const MIN_PAGE = 1;

  const [numberPage, setNumberPage] = useState(MIN_PAGE);
  const [isLeftButtonDisabled, setIsLeftButtonDisabled] = useState(false);
  const [isRightButtonDisabled, setIsRightButtonDisabled] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    currentSearchParam,
    setCurrentSearchParam,
    setCardView,
    setParamsQuery,
  } = useContext(CardContext);

  const paramsQuery = {
    name: '',
    pageNumber: (numberPage - 1) * 40,
  };

  const increment = () => {
    setNumberPage(numberPage + 1);
    setCardView(false);
  };

  const decrement = () => {
    setNumberPage(numberPage > 1 ? numberPage - 1 : MIN_PAGE);
    setCardView(false);
  };

  useEffect(() => {
    const currentParam = searchParams.get('page') || '1';
    setNumberPage(Number(currentParam));
  }, []);

  useEffect(() => {
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
    setCurrentSearchParam({ page: `${numberPage}` });
    setParamsQuery(paramsQuery);
  }, [numberPage]);

  useEffect(() => {
    setSearchParams(currentSearchParam);
  }, [currentSearchParam]);

  return (
    <div className={styles.pageButton}>
      <button
        data-testid="buttonLeft"
        className={styles.buttonLeft}
        disabled={isLeftButtonDisabled}
        onClick={decrement}>
        {'<<<'}
      </button>
      <span className={styles.numberPage}>{`Page ${numberPage}`}</span>
      <button
        data-testid="buttonRight"
        className={styles.buttonRight}
        disabled={isRightButtonDisabled}
        onClick={increment}>
        {'>>>'}
      </button>
    </div>
  );
}
