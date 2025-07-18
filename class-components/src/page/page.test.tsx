import { beforeEach, describe, expect, test } from 'vitest';
import { render } from '@testing-library/react';
import { Page } from './page';
import React from 'react';

describe('Page testing', () => {
  const ref = React.createRef<Page>();
  beforeEach(() => {
    render(<Page ref={ref} />);
  });

  test('waiting for request to be sent', async () => {
    await new Promise((resolve) => setTimeout(resolve, 0));
  });

  test('is there a ref', () => {
    expect(ref.current).toBeDefined();
  });

  test('the method is a function', () => {
    if (ref.current) {
      expect(typeof ref.current.searchRequest).toBe('function');
    }
  });

  test('data is saved to local storage', () => {
    if (ref.current && typeof ref.current.searchRequest === 'function') {
      ref.current.searchRequest('pikachu');
      expect(localStorage.length).toBe(0);
    }
  });
});
