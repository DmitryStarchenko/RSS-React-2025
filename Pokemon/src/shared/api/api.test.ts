import { describe, expect, test } from 'vitest';
import { apiRequest } from './api';

describe('Page testing', () => {
  const rejected = 'asdasd';
  const resolved = 'pikachu';
  test('resolved api request', async () => {
    const response = apiRequest(resolved);
    expect((await response).status).toBe(200);
  });

  test('rejected api request', async () => {
    const response = apiRequest(rejected);
    expect((await response).status).toBe(404);
  });

  test('respons with the pokemons', async () => {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon/?limit=40');

    await expect(response.json()).resolves.toEqual([
      {
        name: 'asdasd',
        url: 'asdsadasd',
      },
      {
        name: 'tret',
        url: 'wetewt',
      },
    ]);
  });

  test('respons with the pokemon', async () => {
    const response = await fetch(
      'https://pokeapi.co/api/v2/pokemon/pikachu?limit=40',
    );
    await expect(response.json()).resolves.toEqual({
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
  });
});
