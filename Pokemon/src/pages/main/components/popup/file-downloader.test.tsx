import { describe, expect, test } from 'vitest';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { FileDownloader } from './file-downloader';
import { Provider } from 'react-redux';
import { store } from '../../../../shared/store/configureStore';

describe('header testing', () => {
  test('header testing', () => {
    render(
      <Provider store={store}>
        <FileDownloader />
      </Provider>,
    );
    expect(screen.getByTestId('buttonDownload')).toBeInTheDocument();
    expect(screen.getByTestId('linkDownload')).toBeInTheDocument();
  });
});
