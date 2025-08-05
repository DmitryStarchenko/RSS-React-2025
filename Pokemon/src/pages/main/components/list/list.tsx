import { useContext, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import styles from '../styles/list.module.css';
import { Results } from '../../../../types';
import {
  CardContext,
  useAppDispatch,
  useAppSelector,
  deletePokemon,
  setPokemon,
} from '../../../../shared';

export function List(props: Results) {
  const {
    setParamsQuery,
    currentSearchParam,
    setCurrentSearchParam,
    setCardView,
  } = useContext(CardContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const [isChecked, setIsChecked] = useState(false);
  const pokemonId = props.url.slice(34).slice(0, -1);
  searchParams.get('details');
  const dispatch = useAppDispatch();
  const pokemon = useAppSelector((state) => state.pokemon.pokemon);
  const paramsQuery = {
    name: props.name,
    pageNumber: undefined,
  };

  const handleClick = (event) => {
    setCardView(true);
    event.preventDefault();
    setCurrentSearchParam({ ...currentSearchParam, details: `${props.name}` });
    setParamsQuery(paramsQuery);
  };

  const handleChecked = () => {
    setIsChecked(!isChecked);
    dispatch(setPokemon([...pokemon, props]));
    if (isChecked) {
      dispatch(deletePokemon(props.name));
    }
  };

  useEffect(() => {
    if (pokemon.length === 0) {
      setIsChecked(false);
    } else {
      pokemon.map((item) => {
        if (item.name === props.name) {
          setIsChecked(true);
        }
      });
    }
  }, [pokemon]);

  useEffect(() => {
    setSearchParams(currentSearchParam);
  }, [setCurrentSearchParam]);

  return (
    <div className={styles.content}>
      <input
        className={styles.checkbox}
        type="checkbox"
        checked={isChecked}
        onChange={handleChecked}
      />
      <li className={styles.listItem} onClick={(event) => handleClick(event)}>
        <p data-testid="pokemonName" className={styles.liName}>
          {props.name}
        </p>
        <p
          data-testid="pokemonDescription"
          className={styles.description}>{`Pokemon id: ${pokemonId}`}</p>
      </li>
    </div>
  );
}
