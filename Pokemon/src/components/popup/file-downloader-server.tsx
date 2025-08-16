import { useAppSelector } from '../../shared/store/configureStore';
import { FileDownloaderClient } from './file-downloader';

export function FileDownloaderServer() {
  const pokemons = useAppSelector((state) => state.pokemon.pokemon);
  const fileContent = JSON.stringify(pokemons);
  const blob = new Blob([fileContent], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);

  return (
    <FileDownloaderClient url={url} selectedNumberPokemon={pokemons.length} />
  );
}
