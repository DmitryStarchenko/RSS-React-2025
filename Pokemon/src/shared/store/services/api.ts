import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { ParamsQuery, Pokemon } from '../../../types';

export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/pokemon/' }),
  endpoints: (builder) => ({
    getPokemon: builder.query<Pokemon, ParamsQuery>({
      query: (params) => {
        const { name, pageNumber } = params;
        return {
          url: `${name ? name : ''}?limit=40${pageNumber ? `&offset=${pageNumber}` : ''}`,
        };
      },
    }),
  }),
});

export const { useGetPokemonQuery } = pokemonApi;
