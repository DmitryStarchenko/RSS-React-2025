'use client';
import { setPokemon } from '../../shared/store/slices/pokemonSlice';
import {
  useAppDispatch,
  useAppSelector,
} from '../../shared/store/configureStore';
import styles from '../styles/popup.module.css';
import { FileDownloaderServer } from './file-downloader-server';
import { useTranslations } from 'next-intl';

export function Popup() {
  const popup = useTranslations('Popup');
  const pokemons = useAppSelector((state) => state.pokemon.pokemon);
  const dispatch = useAppDispatch();
  return pokemons.length > 0 ? (
    <div className={styles.popup}>
      <p
        className={
          styles.text
        }>{`${popup('leftStr')} ${pokemons.length} ${popup('rightStr')}`}</p>
      <div className={styles.buttonContainer}>
        <button
          className={styles.remove}
          onClick={() => dispatch(setPokemon([]))}>
          {popup('button')}
        </button>
        <FileDownloaderServer />
      </div>
    </div>
  ) : undefined;
}
