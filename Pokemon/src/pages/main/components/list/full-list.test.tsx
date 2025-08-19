import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { Provider } from 'react-redux';
import { FullList } from '.';
import { Results } from '../../../../types';
import { CardContext, StyleContextProvider, store } from '../../../../shared';
import { BrowserRouter, Route, Routes } from 'react-router';

type ProviderProps = { children: React.ReactNode };

export function MockCardContextProvider({ children }: ProviderProps) {
  const list: Results[] = [
    { name: 'pikachu', url: 'http://pictures.by' },
    { name: 'pikachu', url: 'http://pictures.by' },
  ];
  const setCurrentSearchParam = () => {};
  const setList = () => {};
  const setCard = () => {};
  const setParamsQuery = () => {};
  const setCardView = () => {};

  const value = {
    list,
    setList,
    setCard,
    setParamsQuery,
    setCurrentSearchParam,
    setCardView,
  };
  return <CardContext.Provider value={value}>{children}</CardContext.Provider>;
}

describe('full list testing', () => {
  test('full list display components', () => {
    render(
      <Provider store={store}>
        <StyleContextProvider>
          <MockCardContextProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<FullList />} />
              </Routes>
            </BrowserRouter>
          </MockCardContextProvider>
        </StyleContextProvider>
      </Provider>,
    );
    expect(screen.getByTestId('nameColumn')).toBeInTheDocument();
    expect(screen.getByTestId('descriptionsColumn')).toBeInTheDocument();
  });
});
