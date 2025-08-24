import '@testing-library/jest-dom/vitest';

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ResultView } from './result-view';
import { useAppSelector } from '../../shared';

vi.mock('../../shared', () => ({
  useAppSelector: vi.fn(),
}));

vi.mock(import('./result-view.module.css'), async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    result: 'result',
    item: 'item',
    image: 'image',
  };
});

describe('ResultView', () => {
  const mockAllInfo = {
    age: 25,
    firstName: 'John Doe',
    country: 'USA',
    password: 'password123',
    confirmPassword: 'password123',
    terms: true,
    gender: 'male',
    email: 'john@example.com',
  };

  const mockImage = {
    data: 'data:image/png;base64,test-image-data',
    name: 'avatar.png',
  };

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useAppSelector).mockImplementation((selector) => {
      if (selector.toString().includes('allInfo')) {
        return mockAllInfo;
      }
      if (selector.toString().includes('image')) {
        return mockImage;
      }
      return null;
    });
  });

  it('should return null when isShowing is true', () => {
    const { container } = render(<ResultView isShowing={true} />);
    expect(container.firstChild).toBeNull();
  });

  it('should return null when age is not provided', () => {
    vi.mocked(useAppSelector).mockImplementation((selector) => {
      if (selector.toString().includes('allInfo')) {
        return { ...mockAllInfo, age: null };
      }
      if (selector.toString().includes('image')) {
        return mockImage;
      }
      return null;
    });

    const { container } = render(<ResultView isShowing={false} />);
    expect(container.firstChild).toBeNull();
  });

  it('should render result view when isShowing is false and age is provided', () => {
    render(<ResultView isShowing={false} />);

    expect(screen.getByText('Result')).toBeInTheDocument();
    expect(screen.getByText('Name: John Doe')).toBeInTheDocument();
    expect(screen.getByText('Age: 25')).toBeInTheDocument();
    expect(screen.getByText('Country: USA')).toBeInTheDocument();
    expect(screen.getByText('Email: john@example.com')).toBeInTheDocument();
    expect(screen.getByText('Gender: male')).toBeInTheDocument();
    expect(screen.getByText('Password: password123')).toBeInTheDocument();
    expect(
      screen.getByText('Confirm password: password123'),
    ).toBeInTheDocument();
    expect(screen.getByText('Term: agreed')).toBeInTheDocument();
    expect(screen.getByText('Image: avatar.png')).toBeInTheDocument();

    const image = screen.getByAltText('image');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute(
      'src',
      'data:image/png;base64,test-image-data',
    );
  });

  it('should display "did not agree" when terms are false', () => {
    vi.mocked(useAppSelector).mockImplementation((selector) => {
      if (selector.toString().includes('allInfo')) {
        return { ...mockAllInfo, terms: false };
      }
      if (selector.toString().includes('image')) {
        return mockImage;
      }
      return null;
    });

    render(<ResultView isShowing={false} />);
    expect(screen.getByText('Term: did not agree')).toBeInTheDocument();
  });

  it('should call useAppSelector with correct selectors', () => {
    render(<ResultView isShowing={false} />);

    expect(useAppSelector).toHaveBeenCalledTimes(2);
    const firstCall = vi.mocked(useAppSelector).mock.calls[0];
    const secondCall = vi.mocked(useAppSelector).mock.calls[1];

    expect(typeof firstCall[0]).toBe('function');
    expect(typeof secondCall[0]).toBe('function');
  });
});
