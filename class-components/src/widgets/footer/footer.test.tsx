import { beforeEach, describe, expect, test } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { Footer } from './footer';

describe('footer testing', () => {
  let button: HTMLButtonElement;
  beforeEach(() => {
    render(<Footer />);
    button = screen.getByRole('button', { name: 'Throw Error' });
  });

  test('button testing', () => {
    expect(button.tagName).toBe('BUTTON');
  });

  test('клик на кнопку изменяет текст', () => {
    expect(() => {
      fireEvent.click(button);
    }).toThrow();
  });
});
