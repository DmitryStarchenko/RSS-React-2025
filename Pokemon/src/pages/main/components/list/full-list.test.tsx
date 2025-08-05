import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { FullList } from '.';
import { Results } from '../../../../types';
import { CardContext, StyleContextProvider, store } from '../../../../shared';

type ProviderProps = { children: React.ReactNode };

export function MockCardContextProvider({ children }: ProviderProps) {
  const list: Results[] = [
    { name: 'pikachu', url: 'http://pictures.by' },
    { name: 'pikachu', url: 'http://pictures.by' },
  ];
  const setCurrentSearchParam = () => {};
  const setList = () => {};
  const setCard = () => {};
  const setError = () => {};
  const setCardView = () => {};

  const value = {
    list,
    setList,
    setCard,
    setError,
    setCurrentSearchParam,
    setCardView,
  };
  return <CardContext.Provider value={value}>{children}</CardContext.Provider>;
}

describe('card testing', () => {
  test('full list display components', () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <StyleContextProvider>
            <MockCardContextProvider>
              <FullList />
            </MockCardContextProvider>
          </StyleContextProvider>
        </Provider>
      </BrowserRouter>,
    );
    expect(screen.getByTestId('nameColumn')).toBeInTheDocument();
    expect(screen.getByTestId('descriptionsColumn')).toBeInTheDocument();
  });
});
