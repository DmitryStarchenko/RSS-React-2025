import '@testing-library/jest-dom/vitest';

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { UncontrolledForm } from './Form';
import {
  useAppDispatch,
  useAppSelector,
  useClickOutside,
  useEscapeKey,
  setInfo,
  clearImage,
} from '../../shared';
import { ValidationError } from 'yup';

// Мокируем все зависимости
vi.mock('../../shared', () => {
  const mockDispatch = vi.fn();
  const mockClearImage = vi.fn();

  return {
    useAppDispatch: () => mockDispatch,
    useAppSelector: vi.fn(),
    useClickOutside: vi.fn(),
    useEscapeKey: vi.fn(),
    setInfo: vi.fn(),
    clearImage: mockClearImage,
    validationSchema: {
      validate: vi.fn(),
    },
  };
});

vi.mock('yup', () => {
  return {
    ValidationError: vi.fn(),
  };
});

vi.mock('./components', () => {
  return {
    Country: vi.fn(({ countryRef }) => (
      <div>
        <input ref={countryRef} data-testid="country-input" />
        Country
      </div>
    )),
    UploadImage: vi.fn(({ avatarRef }) => (
      <div>
        <input ref={avatarRef} type="file" data-testid="avatar-input" />
        UploadImage
      </div>
    )),
  };
});

vi.mock(import('../../shared/form.module.css'), async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    formContainer: 'formContainer',
    buttonClose: 'buttonClose',
    form: 'form',
    formContent: 'formContent',
    partForm: 'partForm',
    submitButton: 'submitButton',
    formGroup: 'formGroup',
    errorView: 'errorView',
    errorMessage: 'errorMessage',
    radioGroup: 'radioGroup',
    checkboxLabel: 'checkboxLabel',
  };
});

// Мокируем React hooks глобально
vi.mock('react', async () => {
  const actual = await vi.importActual('react');
  return {
    ...actual,
    useRef: vi
      .fn()
      .mockImplementation((initialValue) => ({ current: initialValue })),
    useState: vi
      .fn()
      .mockImplementation((initialValue) => [initialValue, vi.fn()]),
  };
});

describe('UncontrolledForm', () => {
  const mockHide = vi.fn();
  let mockDispatch;
  let mockClearImage;
  let mockValidate;

  beforeEach(async () => {
    vi.clearAllMocks();

    // Получаем моки из shared модуля
    mockDispatch = vi.mocked(useAppDispatch)();
    mockClearImage = vi.mocked(clearImage);

    // Мокируем validationSchema через динамический импорт
    const sharedModule = await import('../../shared');
    mockValidate = vi.fn().mockResolvedValue({});
    sharedModule.validationSchema.validate = mockValidate;

    // Мокируем custom hooks
    vi.mocked(useClickOutside).mockImplementation(() => {});
    vi.mocked(useEscapeKey).mockImplementation(() => {});
    vi.mocked(useAppSelector).mockReturnValue([]);

    // Мокируем функции из shared
    vi.mocked(setInfo).mockImplementation((data) => ({
      type: 'Info/setInfo',
      payload: data,
    }));
  });

  it('should call hide when close button is clicked', () => {
    render(<UncontrolledForm isShowing={true} hide={mockHide} />);

    const closeButton = screen.getByText('X');
    fireEvent.click(closeButton);

    expect(mockHide).toHaveBeenCalledTimes(1);
  });

  it('should render form title and submit button when isShowing is true', () => {
    render(<UncontrolledForm isShowing={true} hide={mockHide} />);

    expect(screen.getByText('Uncontrolled Form')).toBeInTheDocument();
    expect(screen.getByText('Submit')).toBeInTheDocument();
  });

  it('should create form with correct id when isShowing is true', () => {
    const { container } = render(
      <UncontrolledForm isShowing={true} hide={mockHide} />,
    );
    expect(container.querySelector('#uncontrolledForm')).toBeInTheDocument();
  });

  it('should call useClickOutside and useEscapeKey hooks when isShowing is true', () => {
    render(<UncontrolledForm isShowing={true} hide={mockHide} />);

    expect(useClickOutside).toHaveBeenCalledWith(
      'uncontrolledForm',
      mockHide,
      true,
    );
    expect(useEscapeKey).toHaveBeenCalledWith(mockHide);
  });

  it('should render all form fields', () => {
    render(<UncontrolledForm isShowing={true} hide={mockHide} />);

    expect(screen.getByLabelText('Name *')).toBeInTheDocument();
    expect(screen.getByLabelText('Age *')).toBeInTheDocument();
    expect(screen.getByLabelText('Email *')).toBeInTheDocument();
    expect(screen.getByLabelText('Password *')).toBeInTheDocument();
    expect(screen.getByLabelText('Confirm password *')).toBeInTheDocument();
    expect(screen.getByLabelText('Male')).toBeInTheDocument();
    expect(screen.getByLabelText('Female')).toBeInTheDocument();
    expect(screen.getByText('Country')).toBeInTheDocument();
    expect(screen.getByText('UploadImage')).toBeInTheDocument();
    expect(screen.getByLabelText(/I accept the terms/)).toBeInTheDocument();
  });

  it('should handle successful form submission', async () => {
    mockValidate.mockResolvedValue({});

    render(<UncontrolledForm isShowing={true} hide={mockHide} />);

    const submitButton = screen.getByText('Submit');
    fireEvent.click(submitButton);

    await vi.waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith(expect.any(Object));
      expect(mockHide).toHaveBeenCalled();
    });
  });

  it('should handle form validation errors', async () => {
    const validationError = new ValidationError(
      'Validation failed',
      'test',
      'test',
    );
    validationError.inner = [
      {
        path: 'firstName',
        message: 'Name is required',
      } as ValidationError,
    ];

    mockValidate.mockRejectedValue(validationError);

    render(<UncontrolledForm isShowing={true} hide={mockHide} />);

    const submitButton = screen.getByText('Submit');
    fireEvent.click(submitButton);

    await vi.waitFor(() => {
      expect(mockClearImage).toHaveBeenCalled();
      expect(mockDispatch).not.toHaveBeenCalledWith(expect.any(Object));
      expect(mockHide).not.toHaveBeenCalled();
    });
  });

  it('should not call setInfo and hide when validation fails', async () => {
    const validationError = new ValidationError(
      'Validation failed',
      'test',
      'test',
    );
    validationError.inner = [
      {
        path: 'terms',
        message: 'Must accept terms',
      } as ValidationError,
    ];

    mockValidate.mockRejectedValue(validationError);

    render(<UncontrolledForm isShowing={true} hide={mockHide} />);

    const submitButton = screen.getByText('Submit');
    fireEvent.click(submitButton);

    await vi.waitFor(() => {
      expect(mockDispatch).not.toHaveBeenCalledWith(expect.any(Object));
      expect(mockHide).not.toHaveBeenCalled();
      expect(mockClearImage).toHaveBeenCalled();
    });
  });

  it('should handle empty form values without errors', async () => {
    mockValidate.mockResolvedValue({});

    render(<UncontrolledForm isShowing={true} hide={mockHide} />);

    const submitButton = screen.getByText('Submit');
    fireEvent.click(submitButton);

    await vi.waitFor(() => {
      expect(mockValidate).toHaveBeenCalled();
    });
  });
});
