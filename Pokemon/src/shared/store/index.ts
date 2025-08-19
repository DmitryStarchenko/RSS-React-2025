export { useGetPokemonQuery, pokemonApi } from './services';
export {
  pokemonReducer,
  setPokemon,
  deletePokemon,
  pokemonSlice,
} from './slices';
export { store, useAppDispatch, useAppSelector } from './configureStore';
