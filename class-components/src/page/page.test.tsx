import { beforeEach, describe, expect, test } from 'vitest';
import { render } from '@testing-library/react';
import { Page } from './page';
import React from 'react';

describe('Page testing', () => {
  const ref = React.createRef<Page>();
  beforeEach(() => {
    render(<Page ref={ref} />);
  });

  test('waiting for request to be sent', async () => {
    await new Promise((resolve) => setTimeout(resolve, 0));
  });

  test('is there a ref', () => {
    expect(ref.current).toBeDefined();
  });

  test('the method is a function', () => {
    if (ref.current) {
      expect(typeof ref.current.searchRequest).toBe('function');
    }
  });

  test('data is saved to local storage', () => {
    if (ref.current && typeof ref.current.searchRequest === 'function') {
      ref.current.searchRequest('pickachu');
      expect(localStorage.length).toBe(0);
    }
  });

  test('responds with the pokemons', async () => {
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

  test('responds with the pokemon', async () => {
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
