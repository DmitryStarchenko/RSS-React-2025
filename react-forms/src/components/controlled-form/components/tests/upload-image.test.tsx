import '@testing-library/jest-dom/vitest';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { UploadImage } from '../upload-image';
import type { FieldErrors } from 'react-hook-form';
import type { FormData } from '../../../../globalTypes';

vi.mock('../../../shared/form.module.css', () => ({
  formGroup: 'formGroup',
  inputFile: 'inputFile',
  customFileButton: 'customFileButton',
  buttonText: 'buttonText',
  errorView: 'errorView',
  errorMessage: 'errorMessage',
  imageInfo: 'imageInfo',
  imagePreview: 'imagePreview',
  fileInfo: 'fileInfo',
}));

const mockStore = configureStore({
  reducer: {
    image: (state = { data: '', name: '' }) => state,
  },
});

describe('UploadImage', () => {
  const mockSetValue = vi.fn();
  const mockRegister = vi.fn();
  const mockErrors: FieldErrors<FormData> = {};

  beforeEach(() => {
    vi.clearAllMocks();
    mockRegister.mockReturnValue({});
  });

  const renderWithProvider = (component: React.ReactElement) => {
    return render(<Provider store={mockStore}>{component}</Provider>);
  };

  it('should render file input and label', () => {
    renderWithProvider(
      <UploadImage
        errors={mockErrors}
        setValue={mockSetValue}
        register={mockRegister}
      />,
    );

    expect(screen.getByLabelText('Upload image *')).toBeInTheDocument();
    expect(screen.getByText('Select file')).toBeInTheDocument();
  });

  it('should handle file selection', async () => {
    const file = new File(['test'], 'test.png', { type: 'image/png' });

    renderWithProvider(
      <UploadImage
        errors={mockErrors}
        setValue={mockSetValue}
        register={mockRegister}
      />,
    );

    const fileInput = screen.getByLabelText('Upload image *');

    fireEvent.change(fileInput, { target: { files: [file] } });

    expect(mockSetValue).toHaveBeenCalledWith('avatar', file, {
      shouldValidate: true,
    });
    expect(mockSetValue).toHaveBeenCalledWith('imageType', 'image/png', {
      shouldValidate: true,
    });
    expect(mockSetValue).toHaveBeenCalledWith('imageSize', 4, {
      shouldValidate: true,
    });
  });

  it('should handle file removal', () => {
    renderWithProvider(
      <UploadImage
        errors={mockErrors}
        setValue={mockSetValue}
        register={mockRegister}
      />,
    );

    const fileInput = screen.getByLabelText('Upload image *');

    fireEvent.change(fileInput, { target: { files: null } });

    expect(mockSetValue).not.toHaveBeenCalled();
  });

  it('should show error messages', () => {
    const errorsWithImageType: FieldErrors<FormData> = {
      imageType: { message: 'Invalid image type', type: 'validate' },
    };

    renderWithProvider(
      <UploadImage
        errors={errorsWithImageType}
        setValue={mockSetValue}
        register={mockRegister}
      />,
    );

    expect(screen.getByText('Invalid image type')).toBeInTheDocument();
  });

  it('should not show image preview when there are errors', () => {
    const file = new File(['test'], 'test.png', { type: 'image/png' });
    const errorsWithImageSize: FieldErrors<FormData> = {
      imageSize: { message: 'File too large', type: 'validate' },
    };

    renderWithProvider(
      <UploadImage
        errors={errorsWithImageSize}
        setValue={mockSetValue}
        register={mockRegister}
      />,
    );

    const fileInput = screen.getByLabelText('Upload image *');
    fireEvent.change(fileInput, { target: { files: [file] } });

    expect(screen.queryByAltText('Preview')).not.toBeInTheDocument();
    expect(
      screen.queryByText('File selected: test.png'),
    ).not.toBeInTheDocument();
  });

  it('should handle multiple error types', () => {
    const errorsWithBoth: FieldErrors<FormData> = {
      imageType: { message: 'Invalid type', type: 'validate' },
      imageSize: { message: 'Too large', type: 'validate' },
    };

    renderWithProvider(
      <UploadImage
        errors={errorsWithBoth}
        setValue={mockSetValue}
        register={mockRegister}
      />,
    );

    expect(screen.getByText('Invalid type')).toBeInTheDocument();
    expect(screen.queryByText('Too large')).not.toBeInTheDocument();
  });
});
