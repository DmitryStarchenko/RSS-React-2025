import '@testing-library/jest-dom/vitest';
import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { Card } from './card';
import { CardContext, StyleContextProvider } from '../../../../shared';
import { Provider } from 'react-redux';
import { store } from '../../../../shared/store';
import { Pokemon } from 'types';

type ProviderProps = { children: React.ReactNode };

export function MockCardContextProvider({ children }: ProviderProps) {
  const card: Pokemon = {
    id: 10,
    name: 'pikachu',
    sprites: {
      other: {
        dream_world: {
          front_default: 'http://pictures.by',
        },
      },
    },
    stats: [],
    results: [],
  };
  const value = {
    card,
  };
  return <CardContext.Provider value={value}>{children}</CardContext.Provider>;
}

describe('card testing', () => {
  test('responds with the user', async () => {
    const response = await fetch('https://pokeapi.co/pikachu');

    await expect(response.json()).resolves.toEqual({
      id: 10,
      name: 'pikachu',
      sprites: {
        other: {
          dream_world: {
            front_default: 'http://pictures.by',
          },
        },
      },
      stats: [],
    });
  });

  test('card display components', async () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <StyleContextProvider>
            <MockCardContextProvider>
              <Card />
            </MockCardContextProvider>
          </StyleContextProvider>
        </Provider>
      </BrowserRouter>,
    );
    expect(screen.getByTestId('test-h2')).toBeInTheDocument();
    expect(screen.getByTestId('test-img')).toBeInTheDocument();
  });
});
