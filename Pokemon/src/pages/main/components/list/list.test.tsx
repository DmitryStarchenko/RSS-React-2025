import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { List } from '.';
import { Results } from 'types';
import { CardContext, StyleContextProvider } from '../../../../shared';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../../../../shared/store/configureStore';

type ProviderProps = { children: React.ReactNode };

export function MockCardContextProvider({ children }: ProviderProps) {
  const setCurrentSearchParam = () => {};
  const setList = () => {};
  const setCard = () => {};
  const setError = () => {};

  const value = {
    setList,
    setCard,
    setError,
    setCurrentSearchParam,
  };
  return <CardContext.Provider value={value}>{children}</CardContext.Provider>;
}

describe('card testing', () => {
  test('list display components', () => {
    const list: Results = { name: 'pikachu', url: 'http://pictures.by' };
    render(
      <BrowserRouter>
        <Provider store={store}>
          <StyleContextProvider>
            <MockCardContextProvider>
              <List {...list} />
            </MockCardContextProvider>
          </StyleContextProvider>
        </Provider>
      </BrowserRouter>,
    );
    expect(screen.getByTestId('pokemonName')).toBeInTheDocument();
    expect(screen.getByTestId('pokemonDescription')).toBeInTheDocument();
  });
});
