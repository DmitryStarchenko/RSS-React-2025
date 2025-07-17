import { beforeEach, describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import { List } from './list';
import { Results } from 'types';

describe('header testing', () => {
  const results: Results = {
    name: '',
    url: '5bcvbxbgnfngfnfgnffgnfnnzcfxbfdbf/5/',
  };
  let li: HTMLLIElement;
  let p: HTMLParagraphElement;
  beforeEach(() => {
    render(<List {...results} />);
    li = screen.getByRole('listitem');
    p = screen.getByText('Pokemon id: 5');
  });

  test('input testing', () => {
    expect(li.tagName).toBe('LI');
  });

  test('header testing', () => {
    expect(p.tagName).toBe('P');
  });
});
