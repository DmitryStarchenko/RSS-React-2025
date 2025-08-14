import { render } from '@testing-library/react';
import { describe, test } from 'vitest';
import { BrowserRouter } from 'react-router';
import { Provider } from 'react-redux';
import { CardContext } from '.';
import { List } from '../../../pages/main';
import { store } from '../..';

const mockContextValue = {
  userData: { name: 'Test User', age: 30 },
  theme: 'light',
};

const props = {
  name: 'Pikachu',
  url: 'https://api.com/pikachu.png',
};

describe('MyComponent with useContext', () => {
  test('should render with destructured context values', () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          {' '}
          <CardContext.Provider value={mockContextValue}>
            <List {...props} />
          </CardContext.Provider>
        </Provider>
      </BrowserRouter>,
    );
  });
});
