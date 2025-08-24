import '@testing-library/jest-dom/vitest';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ControlledForm } from './Form';
import { Control, FieldValues, useForm } from 'react-hook-form';
import {
  useAppDispatch,
  useAppSelector,
  useClickOutside,
  useEscapeKey,
  setInfo,
} from '../../shared';

vi.mock('react-hook-form', () => ({
  useForm: vi.fn(),
}));

vi.mock('../../shared', () => ({
  useAppDispatch: vi.fn(),
  useAppSelector: vi.fn(),
  useClickOutside: vi.fn(),
  useEscapeKey: vi.fn(),
  setInfo: vi.fn(),
  validationSchema: {},
}));

vi.mock('./components', () => ({
  Name: vi.fn(() => <div>Name</div>),
  Age: vi.fn(() => <div>Age</div>),
  Email: vi.fn(() => <div>Email</div>),
  Password: vi.fn(() => <div>Password</div>),
  Gender: vi.fn(() => <div>Gender</div>),
  Country: vi.fn(() => <div>Country</div>),
  UploadImage: vi.fn(() => <div>UploadImage</div>),
  TermsAgreement: vi.fn(() => <div>TermsAgreement</div>),
}));

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
  };
});

describe('ControlledForm', () => {
  const mockHide = vi.fn();
  const mockDispatch = vi.fn();
  const mockRegister = vi.fn();
  const mockSetValue = vi.fn();
  const mockWatch = vi.fn();
  const mockGetValues = vi.fn();
  const mockReset = vi.fn();
  const mockTrigger = vi.fn();
  const mockSetError = vi.fn();
  const mockClearErrors = vi.fn();
  const mockSetFocus = vi.fn();

  const mockFormState = {
    errors: {},
    isDirty: false,
    isLoading: false,
    isSubmitted: false,
    isSubmitSuccessful: false,
    isSubmitting: false,
    isValid: false,
    isValidating: false,
    submitCount: 0,
    dirtyFields: {},
    touchedFields: {},
    defaultValues: undefined,
    disabled: false,
    validatingFields: undefined,
    isReady: false,
  };

  const mockCountries = [
    { id: 1, name: 'USA' },
    { id: 2, name: 'Canada' },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useForm).mockReturnValue({
      register: mockRegister,
      handleSubmit: (callback) => {
        return async (e) => {
          e?.preventDefault();
          await callback({});
        };
      },
      formState: mockFormState,
      setValue: mockSetValue,
      watch: mockWatch,
      getValues: mockGetValues,
      reset: mockReset,
      trigger: mockTrigger,
      setError: mockSetError,
      clearErrors: mockClearErrors,
      setFocus: mockSetFocus,
      unregister: vi.fn(),
      control: {} as Control<FieldValues, unknown, unknown>,
      getFieldState: vi.fn(),
      resetField: vi.fn(),
      subscribe: vi.fn(),
    });

    vi.mocked(useAppDispatch).mockReturnValue(mockDispatch);
    vi.mocked(useAppSelector).mockImplementation((selector) => {
      if (selector.toString().includes('countries.list')) {
        return mockCountries;
      }
      return [];
    });

    vi.mocked(useClickOutside).mockImplementation(() => {});
    vi.mocked(useEscapeKey).mockImplementation(() => {});
  });

  it('should call hide when close button is clicked', () => {
    render(<ControlledForm isShowing={true} hide={mockHide} />);

    const closeButton = screen.getByText('X');
    fireEvent.click(closeButton);

    expect(mockHide).toHaveBeenCalledTimes(1);
  });

  it('should render form title and submit button when isShowing is true', () => {
    render(<ControlledForm isShowing={true} hide={mockHide} />);

    expect(screen.getByText('Controlled Form')).toBeInTheDocument();
    expect(screen.getByText('Submit')).toBeInTheDocument();
  });

  it('should create form with correct id when isShowing is true', () => {
    const { container } = render(
      <ControlledForm isShowing={true} hide={mockHide} />,
    );
    expect(container.querySelector('#controlledForm')).toBeInTheDocument();
  });

  it('should initialize useForm with correct parameters', () => {
    render(<ControlledForm isShowing={true} hide={mockHide} />);

    expect(useForm).toHaveBeenCalledWith({
      resolver: expect.anything(),
      mode: 'onChange',
    });
  });

  it('should call useAppSelector for countries', () => {
    render(<ControlledForm isShowing={true} hide={mockHide} />);

    expect(useAppSelector).toHaveBeenCalled();
  });

  it('should call useClickOutside and useEscapeKey hooks when isShowing is true', () => {
    render(<ControlledForm isShowing={true} hide={mockHide} />);

    expect(useClickOutside).toHaveBeenCalledWith(
      'controlledForm',
      mockHide,
      true,
    );
    expect(useEscapeKey).toHaveBeenCalledWith(mockHide);
  });

  it('should handle form submission', () => {
    render(<ControlledForm isShowing={true} hide={mockHide} />);

    const form = document.querySelector('form');
    if (form) {
      fireEvent.submit(form);
    }
  });

  it('should render all form components when isShowing is true', () => {
    render(<ControlledForm isShowing={true} hide={mockHide} />);

    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Age')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('Password')).toBeInTheDocument();
    expect(screen.getByText('Gender')).toBeInTheDocument();
    expect(screen.getByText('Country')).toBeInTheDocument();
    expect(screen.getByText('UploadImage')).toBeInTheDocument();
    expect(screen.getByText('TermsAgreement')).toBeInTheDocument();
  });

  it('should call setInfo on form submission', () => {
    const mockHandleSubmitImpl = vi.fn().mockImplementation((callback) => {
      return async (e?: React.BaseSyntheticEvent) => {
        e?.preventDefault();
        await callback({ name: 'Test' });
      };
    });

    vi.mocked(useForm).mockReturnValue({
      register: mockRegister,
      handleSubmit: mockHandleSubmitImpl,
      formState: mockFormState,
      setValue: mockSetValue,
      watch: mockWatch,
      getValues: mockGetValues,
      reset: mockReset,
      trigger: mockTrigger,
      setError: mockSetError,
      clearErrors: mockClearErrors,
      setFocus: mockSetFocus,
      unregister: vi.fn(),
      control: {} as Control<FieldValues, unknown, unknown>,
      getFieldState: vi.fn(),
      resetField: vi.fn(),
      subscribe: vi.fn(),
    });

    render(<ControlledForm isShowing={true} hide={mockHide} />);

    const submitButton = screen.getByText('Submit');
    fireEvent.click(submitButton);

    expect(mockDispatch).toHaveBeenCalledWith(setInfo(expect.anything()));
    expect(mockHide).toHaveBeenCalled();
  });
});
