import { render } from '@testing-library/react';
import { FullList } from './full-list';
import { CardContext } from '../../../../shared/context';
import { describe, expectTypeOf, test } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom/vitest';

describe('full list testing', () => {
  test('comes array', () => {
    const testValue = {
      list: [],
      cardView: false,
      setCardView: () => {},
      setCurrentSearchParam: () => {},
      setError: () => {},
      setCard: () => {},
      setList: () => {},
    };
    render(
      <BrowserRouter>
        <CardContext value={testValue}>
          <FullList />
        </CardContext>
      </BrowserRouter>,
    );

    expectTypeOf(testValue.list).toBeArray();
  });
});
