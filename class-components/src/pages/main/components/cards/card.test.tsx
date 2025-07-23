import { beforeEach, describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Card } from './card';
import { type Pokemon } from '../../../../types';

describe('card testing', () => {
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

  test('card img testing', () => {
    expect(img.tagName).toBe('IMG');
  });

  test('card heading testing', () => {
    expect(heading.tagName).toBe('H2');
  });
});
