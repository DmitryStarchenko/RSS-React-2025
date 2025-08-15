'use client';
import { useEffect, useState, useContext } from 'react';
import styles from '../styles/pagination.module.css';
import CardContext from '../../shared/context/card-context/context';
import { useRouter, useSearchParams } from 'next/navigation';

export function Pagination() {
  const MAX_PAGE = 15;
  const MIN_PAGE = 1;
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setCardView, setParamsQuery } = useContext(CardContext);
  const [numberPage, setNumberPage] = useState(MIN_PAGE);
  const [isLeftButtonDisabled, setIsLeftButtonDisabled] = useState(false);
  const [isRightButtonDisabled, setIsRightButtonDisabled] = useState(false);
  const params = new URLSearchParams(searchParams.toString());

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

  const handleAddParamsPage = () => {
    params.delete('details');
    params.set('page', numberPage.toString());
    router.push(`?${params.toString()}`);
  };

  useEffect(() => {
    const currentPage = searchParams.get('page') || '1';
    setNumberPage(Number(currentPage));
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
    setParamsQuery(paramsQuery);
    if (!params.has('card')) handleAddParamsPage();
  }, [numberPage]);

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
