import { beforeEach, describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { About } from './about';

describe('about testing', () => {
  beforeEach(() => {
    render(<About />);
  });

  test('count links testing', () => {
    expect(screen.getAllByRole('link')).toHaveLength(2);
  });

  test('match url testing', () => {
    const links = screen.getAllByRole('link');
    expect(links[0]).toHaveAttribute(
      'href',
      'https://github.com/DmitryStarchenko',
    );
    expect(links[1]).toHaveAttribute(
      'href',
      'https://rs.school/courses/reactjs',
    );
  });
});
