import { beforeEach, describe, expect, test, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { Header } from './header';

describe('header testing', () => {
  const searchRequest = vi.fn();
  let input: HTMLInputElement;
  let header: HTMLElement;
  let img: HTMLImageElement;
  let button: HTMLButtonElement;
  beforeEach(() => {
    render(<Header searchRequest={searchRequest} />);
    input = screen.getByRole('searchbox');
    img = screen.getByRole('img');
    header = screen.getByRole('banner');
    button = screen.getByRole('button', { name: 'Search' });
  });

  test('input testing', () => {
    expect(input.tagName).toBe('INPUT');
  });

  test('header testing', () => {
    expect(header.tagName).toBe('HEADER');
  });

  test('img testing', () => {
    expect(img.tagName).toBe('IMG');
  });

  test('button testing', () => {
    expect(button.tagName).toBe('BUTTON');
  });

  test('onChange updates the state', () => {
    expect(input.value).toBe('');
    fireEvent.change(input, { target: { value: 'test value' } });
    expect(input.value).toBe('test value');
  });
});
