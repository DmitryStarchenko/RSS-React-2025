import { beforeEach, describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Loader } from './loader';

describe('loader testing', () => {
  let heading: HTMLHeadingElement;
  beforeEach(() => {
    render(<Loader />);
    heading = screen.getByText('Loading...');
  });

  test('heading loader testing', () => {
    expect(heading.tagName).toBe('H1');
  });
});
