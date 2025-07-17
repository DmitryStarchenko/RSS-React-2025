import { beforeEach, describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Card } from './card';
import { type Pokemon } from '../../../types';

describe('header testing', () => {
  const cards: Pokemon = {
    id: 321,
    name: '',
    sprites: {
      other: {
        dream_world: {
          front_default: '',
        },
      },
    },
    stats: [],
  };
  let img: HTMLImageElement;
  let heading: HTMLHeadingElement;
  beforeEach(() => {
    render(<Card {...cards} />);
    img = screen.getByRole('presentation');
    heading = screen.getByRole('heading');
  });

  test('img testing', () => {
    expect(img.tagName).toBe('IMG');
  });

  test('heading testing', () => {
    expect(heading.tagName).toBe('H2');
  });
});
