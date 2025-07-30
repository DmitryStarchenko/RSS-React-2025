import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Results } from 'types';

interface State {
  pokemon: Results[];
}

const initialState: State = {
  pokemon: [],
};

export const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {
    setPokemon: (state, action: PayloadAction<Results[]>) => {
      state.pokemon = action.payload;
    },
  },
});

export const { setPokemon } = pokemonSlice.actions;

export default pokemonSlice.reducer;
