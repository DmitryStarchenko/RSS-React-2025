import { render, screen } from '@testing-library/react';
import { Pagination } from './pagination';
import { CardContext } from '../../../../shared/context';
import { describe, expect, test } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom/vitest';

describe('MyComponent with useContext', () => {
  test('должен отображать данные из контекста', () => {
    const testValue = {
      setList: () => {},
      setCard: () => {},
      setError: () => {},
      currentSearchParam: '',
      setCurrentSearchParam: () => {},
      setCardView: () => {},
    };
    render(
      <BrowserRouter>
        <CardContext value={testValue}>
          <Pagination />
        </CardContext>
      </BrowserRouter>,
    );

    expect(screen.getByText('Page 1')).toBeInTheDocument();
  });
});
