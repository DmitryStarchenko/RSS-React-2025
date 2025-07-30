import { useContext, useEffect, useState } from 'react';
import styles from '../styles/list.module.css';
import { Pokemon, Results } from '../../../../types';
import { apiRequest, CardContext } from '../../../../shared';
import { useSearchParams } from 'react-router';
import { useAppDispatch, useAppSelector } from '../../../../shared/store';
import {
  deletePokemon,
  setPokemon,
} from '../../../../shared/store/slices/pokemonSlice';

export function List(props: Results) {
  const {
    setCard,
    setIsLoading,
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
        <p className={styles.liName}>{props.name}</p>
        <p className={styles.description}>{`Pokemon id: ${pokemonId}`}</p>
      </li>
    </div>
  );
}
