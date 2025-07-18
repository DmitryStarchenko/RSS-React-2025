import { beforeEach, describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import { App } from './App';

describe('header testing', () => {
  let header: HTMLElement;
  beforeEach(() => {
    render(<App />);
    header = screen.getByRole('banner');
  });

  test('header testing', () => {
    expect(header.tagName).toBe('HEADER');
  });
});
