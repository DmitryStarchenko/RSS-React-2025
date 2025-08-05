import '@testing-library/jest-dom/vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { describe, expect, test, vi } from 'vitest';
import { Search } from './search';
import { CardContext, StyleContextProvider, store } from '../../../../shared';

type ProviderProps = { children: React.ReactNode };

export function MockCardContextProvider({ children }: ProviderProps) {
  const setCurrentSearchParam = () => {};
  const setList = () => {};
  const setCard = () => {};
  const setError = () => {};
  const setCardView = () => {};

  const value = {
    setList,
    setCard,
    setError,
    setCurrentSearchParam,
    setCardView,
  };
  return <CardContext.Provider value={value}>{children}</CardContext.Provider>;
}

describe('search tests', () => {
  test('one click search button', () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <StyleContextProvider>
            <MockCardContextProvider>
              <Search />
            </MockCardContextProvider>
          </StyleContextProvider>
        </Provider>
      </BrowserRouter>,
    );
    const handleClick = vi.fn();
    const buttonSearch = screen.getByText('Search');

    fireEvent.click(buttonSearch);

    expect(handleClick).toHaveBeenCalledTimes(0);
  });
});
