import { handleSearchRequest } from './handle-search-request';
import { describe, test } from 'vitest';
import '@testing-library/jest-dom/vitest';

describe('handleSearchRequest testing', () => {
  test('function call', () => {
    const props = {
      setList: () => {},
      setCard: () => {},
      setError: () => {},
    };

    handleSearchRequest('', 1, props);
  });
});
