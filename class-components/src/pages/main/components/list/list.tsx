import { useContext, useEffect } from 'react';
import styles from '../styles/list.module.css';
import { Pokemon, Results } from '../../../../types';
import { apiRequest, CardContext } from '../../../../shared';
import { useSearchParams } from 'react-router';

export function List(props: Results) {
  const {
    setCard,
    setIsLoading,
    currentSearchParam,
    setCurrentSearchParam,
    setCardView,
  } = useContext(CardContext);
  const [searchParams, setSearchParams] = useSearchParams();
  searchParams.get('details');

  const handleClick = (event) => {
    event.preventDefault();
    setCurrentSearchParam({ ...currentSearchParam, details: `${props.name}` });
    apiRequest(props.name)
      .then((response) => response.json())
      .then((response: Pokemon) => {
        setCard(response);
        setIsLoading(false);
        setCardView(true);
      });
  };

  useEffect(() => {
    setSearchParams(currentSearchParam);
  }, [setCurrentSearchParam]);

  return (
    <li className={styles.listItem} onClick={(event) => handleClick(event)}>
      <p className={styles.liName}>{props.name}</p>
      <p
        className={
          styles.description
        }>{`Pokemon id: ${props.url.slice(34).slice(0, -1)}`}</p>
    </li>
  );
}
