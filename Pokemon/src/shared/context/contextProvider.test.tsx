import { render } from '@testing-library/react';
import { describe, test } from 'vitest';
import { CardContext } from './context';
import { List } from '../../pages/main';
import { BrowserRouter } from 'react-router';

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
        {' '}
        <CardContext.Provider value={mockContextValue}>
          <List {...props} />
        </CardContext.Provider>
        ,
      </BrowserRouter>,
    );
  });
});
