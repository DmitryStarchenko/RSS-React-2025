import { render } from '@testing-library/react';
import { Card } from './card';
import { CardContext } from '../../../../shared/context';
import { describe, expectTypeOf, test } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom/vitest';

describe('full list testing', () => {
  test('comes array', () => {
    const testValue = {
      card: {
        name: '',
        stats: [],
        sprites: {
          other: {
            dream_world: {
              front_default: '',
            },
          },
        },
      },
    };
    render(
      <BrowserRouter>
        <CardContext value={testValue}>
          <Card />
        </CardContext>
      </BrowserRouter>,
    );

    expectTypeOf(testValue).toBeObject();
  });
});
