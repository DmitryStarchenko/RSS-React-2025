import { beforeEach, describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import { NotFound } from './not-found';

describe('loader testing', () => {
  let p: HTMLParagraphElement;
  beforeEach(() => {
    render(<NotFound />);
    p = screen.getByText('Not Found');
  });

  test('heading loader testing', () => {
    expect(p.tagName).toBe('P');
  });
});
