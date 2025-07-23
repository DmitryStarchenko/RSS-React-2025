import { useEffect, useState } from 'react';
import styles from '../styles/page-button.module.css';
import { handlerSearchRequest } from '../../../../shared';
import { useContext } from 'react';
import { CardContext } from '../../../../shared';
import { useNavigate } from 'react-router';

export function Pagination() {
  const [countLinesShown, setCountLinesShown] = useState(0);
  const [page, setPage] = useState(1);
  const [isLeftButtonDisabled, setIsLeftButtonDisabled] = useState(false);
  const [isRightButtonDisabled, setIsRightButtonDisabled] = useState(false);
  const { setList, setCard, setError } = useContext(CardContext);
  const navigate = useNavigate();
  const props = {
    setList,
    setCard,
    setError,
  };
  const increment = () => {
    setCountLinesShown(countLinesShown + 40);
    handlerSearchRequest('', countLinesShown, props);
    setPage(page + 1);
  };

  const decrement = () => {
    setCountLinesShown(countLinesShown > 0 ? countLinesShown - 40 : 0);
    handlerSearchRequest('', countLinesShown, props);
    setPage(page > 1 ? page - 1 : 1);
  };

  useEffect(() => {
    navigate(`/main/page/${page}`);
  }, [page]);

  useEffect(() => {
    handlerSearchRequest('', countLinesShown, props);
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
  }, [countLinesShown]);

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
