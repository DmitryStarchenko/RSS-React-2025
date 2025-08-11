import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('https://pokeapi.co/api/v2/pokemon/?limit=40', () => {
    return HttpResponse.json([
      {
        name: 'asdasd',
        url: 'asdsadasd',
      },
      {
        name: 'tret',
        url: 'wetewt',
      },
    ]);
  }),
  http.get('https://pokeapi.co/api/v2/pokemon/pikachu?limit=40', () => {
    return HttpResponse.json({
      id: 10,
      name: 'dsfdsfdfs',
      sprites: {
        other: {
          dream_world: {
            front_default: 'ghjgjgjh',
          },
        },
      },
      stats: [],
    });
  }),
];
