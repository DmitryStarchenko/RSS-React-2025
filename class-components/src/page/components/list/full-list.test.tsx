import { beforeEach, describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import { FullList } from './full-list';
import { Results } from 'types';

describe('full-list testing', () => {
  const list: Results[] = [
    {
      name: '',
      url: '',
    },
  ];
  let main: HTMLElement;
  let pName: HTMLParagraphElement;
  let pDescr: HTMLParagraphElement;
  beforeEach(() => {
    render(<FullList list={list} />);
    main = screen.getByRole('main');
    pName = screen.getByText('Name');
    pDescr = screen.getByText('Descriptions');
  });

  test('main full-list testing', () => {
    expect(main.tagName).toBe('MAIN');
  });

  test('paragraph name full-list testing', () => {
    expect(pName.tagName).toBe('P');
  });

  test('paragraph full-list testing', () => {
    expect(pDescr.tagName).toBe('P');
  });
});
