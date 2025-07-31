import { setPokemon } from '../../../../shared/store/slices/pokemonSlice';
import { useAppDispatch, useAppSelector } from '../../../../shared/store';
import styles from '../styles/popup.module.css';
import { FileDownloader } from './file-downloader';

export function Popup() {
  const pokemons = useAppSelector((state) => state.pokemon.pokemon);
  const dispatch = useAppDispatch();
  return pokemons.length > 0 ? (
    <div className={styles.popup}>
      <p
        data-testid="textPopup"
        className={
          styles.text
        }>{`You have chosen ${pokemons.length} pokemon(s)`}</p>
      <div className={styles.buttonConteiner}>
        <button
          className={styles.remove}
          onClick={() => dispatch(setPokemon([]))}>
          Unselect all
        </button>
        <FileDownloader />
      </div>
    </div>
  ) : undefined;
}
