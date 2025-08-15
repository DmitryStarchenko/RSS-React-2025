'use client';
import { useContext, useEffect, useState } from 'react';
import styles from '../styles/list.module.css';
import { Results } from '../../types';
import CardContext from '../../shared/context/card-context/context';
import {
  useAppDispatch,
  useAppSelector,
} from '../../shared/store/configureStore';
import {
  deletePokemon,
  setPokemon,
} from '../../shared/store/slices/pokemonSlice';

export function List(props: Results) {
  const sliceLeft = 34;
  const sliceRight = -1;
  const {
    setParamsQuery,
    currentSearchParam,
    setCurrentSearchParam,
    setCardView,
  } = useContext(CardContext);
  const [isChecked, setIsChecked] = useState(false);
  const pokemonId = props.url.slice(sliceLeft).slice(0, sliceRight);
  const dispatch = useAppDispatch();
  const pokemon = useAppSelector((state) => state.pokemon.pokemon);
  const paramsQuery = {
    name: props.name,
    pageNumber: undefined,
  };

  const handleClick = (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
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

  return (
    <div className={styles.content}>
      <input
        className={styles.checkbox}
        type="checkbox"
        checked={isChecked}
        onChange={handleChecked}
      />
      <li className={styles.listItem} onClick={handleClick}>
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
