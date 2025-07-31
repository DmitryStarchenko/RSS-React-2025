import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import { App } from './App';

describe('app testing', () => {
  test('header testing', () => {
    render(<App />);
    const header = screen.getByRole('banner');
    expect(header.tagName).toBe('HEADER');
  });
});
