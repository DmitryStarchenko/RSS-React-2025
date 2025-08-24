import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import { App } from './App';

describe('app testing', () => {
  test('header testing', () => {
    render(<App />);
    const UncontrolledButton = screen.getByText('Show uncontrolled form');
    const ControlledButton = screen.getByText('Show controlled form');

    expect(UncontrolledButton.tagName).toBe('BUTTON');
    expect(ControlledButton.tagName).toBe('BUTTON');
  });
});
