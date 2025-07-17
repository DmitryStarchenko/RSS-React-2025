import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ErrorBoundary } from './error-boundary';

// Тестовый компонент, который будет вызывать ошибку
const ThrowError = () => {
  throw new Error('Test error');
};

describe('ErrorBoundary', () => {
  let consoleError;

  beforeEach(() => {
    consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleError.mockRestore();
  });

  test('should render children when no error occurs', () => {
    render(
      <ErrorBoundary>
        <div>Child component</div>
      </ErrorBoundary>,
    );
    expect(screen.getByText('Child component')).toBeInTheDocument();
  });

  test('should render fallback UI when an error occurs', () => {
    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>,
    );
    expect(screen.getByText('Not Found')).toBeInTheDocument();
  });

  test('should not call setState when no error occurs', () => {
    const setState = vi.spyOn(ErrorBoundary.prototype, 'setState');
    render(
      <ErrorBoundary>
        <div>Child component</div>
      </ErrorBoundary>,
    );
    expect(setState).not.toHaveBeenCalled();
    setState.mockRestore();
  });

  test('should call console.error when an error occurs', () => {
    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>,
    );
    expect(consoleError).toHaveBeenCalled();
  });
});
