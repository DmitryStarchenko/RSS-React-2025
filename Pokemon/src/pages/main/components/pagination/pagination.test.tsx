import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { Pagination } from './pagination';
import { Provider } from 'react-redux';
import { CardContext, StyleContextProvider, store } from '../../../../shared';
import { BrowserRouter } from 'react-router';

type ProviderProps = { children: React.ReactNode };

export function MockCardContextProvider({ children }: ProviderProps) {
  const setCurrentSearchParam = () => {};
  const setList = () => {};
  const setCard = () => {};
  const setParamsQuery = () => {};
  const setCardView = () => {};

  const value = {
    setList,
    setCard,
    setParamsQuery,
    setCurrentSearchParam,
    setCardView,
  };
  return <CardContext.Provider value={value}>{children}</CardContext.Provider>;
}

describe('pagination with useContext', () => {
  test('pagination display components', () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <StyleContextProvider>
            <MockCardContextProvider>
              <Pagination />
            </MockCardContextProvider>
          </StyleContextProvider>
        </Provider>
      </BrowserRouter>,
    );
    expect(screen.getByTestId('buttonLeft')).toBeInTheDocument();
    expect(screen.getByTestId('buttonRight')).toBeInTheDocument();
    expect(screen.getByText('Page 1')).toBeInTheDocument();
  });

  test('one click button pagination', () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <StyleContextProvider>
            <MockCardContextProvider>
              <Pagination />
            </MockCardContextProvider>
          </StyleContextProvider>
        </Provider>
      </BrowserRouter>,
    );
    const handleClick = vi.fn();
    const buttonRight = screen.getByTestId('buttonRight');
    const buttonLeft = screen.getByTestId('buttonLeft');

    fireEvent.click(buttonRight);
    fireEvent.click(buttonLeft);

    expect(handleClick).toHaveBeenCalledTimes(0);
  });
});
