import { useRef, FormEvent, useState, useCallback } from 'react';
import { RootState } from '../controlled-form/types';
import styles from '../controlled-form/form.module.css';
import { useClickOutside } from '../../shared/hooks/useClickOutside';
import { useEscapeKey } from '../../shared/hooks/useEscapeKey';
import {
  clearImage,
  setImage,
  setInfo,
  useAppDispatch,
  useAppSelector,
} from '../../shared/store/store';
import { validationSchema } from '../controlled-form/validationSchema';
import { ValidationError } from 'yup';
import { FormData } from '../controlled-form/types';

type Props = {
  isShowing: boolean;
  hide: () => void;
};

export const UncontrolledForm = ({ isShowing, hide }: Props) => {
  const dispatch = useAppDispatch();
  const countries = useAppSelector((state: RootState) => state.countries.list);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [formId] = useState('uncontrolledForm');
  useClickOutside(formId, hide, isShowing);
  useEscapeKey(hide);

  const formRef = useRef<HTMLFormElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const genderMaleRef = useRef<HTMLInputElement>(null);
  const genderFemaleRef = useRef<HTMLInputElement>(null);
  const agreeToTermsRef = useRef<HTMLInputElement>(null);
  const countryRef = useRef<HTMLInputElement>(null);
  const avatarRef = useRef<HTMLInputElement>(null);
  const countrySelectRef = useRef<HTMLDivElement>(null);

  const [filteredCountries, setFilteredCountries] =
    useState<string[]>(countries);
  const [showDropdown, setShowDropdown] = useState(false);
  const [fieldErrors, setFieldErrors] =
    useState<Partial<Record<keyof FormData, string>>>();

  const getFormValues = (): FormData => {
    const gender = genderMaleRef.current?.checked
      ? 'male'
      : genderFemaleRef.current?.checked
        ? 'female'
        : '';

    return {
      firstName: nameRef.current.value || '',
      age: Number(ageRef.current.value) || null,
      email: emailRef.current.value || '',
      password: passwordRef.current.value || '',
      confirmPassword: confirmPasswordRef.current.value || '',
      gender,
      terms: agreeToTermsRef.current.checked || false,
      avatar: avatarRef.current.files?.[0] || null,
      imageType: avatarRef.current.files?.[0]?.type || '',
      imageSize: avatarRef.current.files?.[0]?.size || null,
      country: countryRef.current.value || '',
    };
  };

  const validateForm = async () => {
    setFieldErrors({});
    const formValues = getFormValues();
    let isValid = true;

    try {
      await validationSchema.validate(formValues, { abortEarly: false });
    } catch (error) {
      if (error instanceof ValidationError) {
        const newErrors: Partial<Record<keyof FormData, string>> = {};
        error.inner.forEach((validationError) => {
          if (validationError.path) {
            const fieldName = validationError.path;
            newErrors[fieldName] = validationError.message;
          }
        });
        setFieldErrors(newErrors);
        dispatch(clearImage());
        isValid = false;
      }
    }

    return isValid;
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const isValid = await validateForm();
    if (isValid) {
      const formValues = getFormValues();
      delete formValues.avatar;
      dispatch(setInfo(formValues));
      hide();
    }
  };

  const selectCountry = (country: string) => {
    if (countryRef.current) {
      countryRef.current.value = country;
      setShowDropdown(false);
    }
  };

  const handleCountryInput = useCallback(() => {
    if (countryRef.current) {
      const inputValue = countryRef.current.value.toLowerCase();
      const filtered = countries.filter((country) =>
        country.toLowerCase().includes(inputValue),
      );
      setFilteredCountries(filtered);
      setShowDropdown(true);
    }
  }, [countries, fieldErrors]);

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const files = event.target.files;
    const newErrors: Partial<Record<keyof FormData, string>> = {};

    if (!files || files.length === 0) {
      dispatch(clearImage());
      setSelectedFile(null);
      newErrors['avatar'] = '';
      setFieldErrors(newErrors);
      return;
    }

    const file = files[0];
    setSelectedFile(file);

    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        dispatch(
          setImage({
            data: typeof e.target.result === 'string' ? e.target.result : '',
            name: file.name,
          }),
        );
      }
    };
    reader.onerror = () => {
      newErrors['avatar'] = 'Error reading file';
      setFieldErrors(newErrors);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div id={formId} className={styles.formContainer}>
      <button className={styles.buttonClose} onClick={hide}>
        X
      </button>
      <h2>Uncontrolled Form</h2>
      <form ref={formRef} onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formContent}>
          <div className={styles.partForm}>
            <div className={styles.formGroup}>
              <label htmlFor="firstName">Name *</label>
              <input ref={nameRef} id="firstName" type="text" />
              <div className={styles.errorView}>
                <span id="name-error" className={styles.errorMessage}>
                  {fieldErrors ? fieldErrors.firstName : ''}
                </span>
              </div>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="age">Age *</label>
              <input ref={ageRef} id="age" type="number" />
              <div className={styles.errorView}>
                <span id="age-error" className={styles.errorMessage}>
                  {fieldErrors ? fieldErrors.age : ''}
                </span>
              </div>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="email">Email *</label>
              <input ref={emailRef} id="email" />
              <div className={styles.errorView}>
                <span id="email-error" className={styles.errorMessage}>
                  {fieldErrors ? fieldErrors.email : ''}
                </span>
              </div>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="password">Password *</label>
              <input ref={passwordRef} id="password" type="password" />
              <div className={styles.errorView}>
                <span id="password-error" className={styles.errorMessage}>
                  {fieldErrors ? fieldErrors.password : ''}
                </span>
              </div>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="confirmPassword">Confirm password *</label>
              <input
                ref={confirmPasswordRef}
                id="confirmPassword"
                type="password"
              />
              <div className={styles.errorView}>
                <span
                  id="confirmPassword-error"
                  className={styles.errorMessage}>
                  {fieldErrors ? fieldErrors.confirmPassword : ''}
                </span>
              </div>
            </div>
          </div>
          <div className={styles.partForm}>
            <div className={styles.formGroup}>
              <label>Gender *</label>
              <div className={styles.radioGroup}>
                <label htmlFor="male">
                  <input
                    ref={genderMaleRef}
                    id="male"
                    type="radio"
                    name="gender"
                    value="male"
                  />
                  Male
                </label>
                <label htmlFor="female">
                  <input
                    ref={genderFemaleRef}
                    id="female"
                    type="radio"
                    name="gender"
                    value="female"
                  />
                  Female
                </label>
              </div>
              <div className={styles.errorView}>
                <span id="gender-error" className={styles.errorMessage}>
                  {fieldErrors ? fieldErrors.gender : ''}
                </span>
              </div>
            </div>
            <div className={styles.formGroup}>
              <div className={styles.countrySelectContainer}>
                <label htmlFor="countryInput">Country *</label>
                <input
                  ref={countryRef}
                  id="countryInput"
                  type="text"
                  onInput={handleCountryInput}
                  onFocus={() => setShowDropdown(true)}
                  placeholder="Start typing country name..."
                />
                {showDropdown && filteredCountries.length > 0 && (
                  <div
                    className={styles.countryDropdown}
                    ref={countrySelectRef}>
                    {filteredCountries.map((country) => (
                      <div
                        key={country}
                        className={styles.countryOption}
                        onClick={() => selectCountry(country)}
                        onMouseDown={(e) => e.preventDefault()}>
                        {country}
                      </div>
                    ))}
                  </div>
                )}
                <div className={styles.errorView}>
                  <span id="country-error" className={styles.errorMessage}>
                    {fieldErrors ? fieldErrors.country : ''}
                  </span>
                </div>
              </div>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="avatar">Upload image</label>
              <input
                ref={avatarRef}
                className={styles.inputFile}
                id="avatar"
                type="file"
                name="avatar"
                onChange={handleImageUpload}
              />
              <label htmlFor="avatar" className={styles.customFileButton}>
                <span className={styles.buttonText}>Select file</span>
              </label>
              <div className={styles.errorView}>
                <span id="avatar-error" className={styles.errorMessage}>
                  {fieldErrors
                    ? fieldErrors.avatar
                      ? fieldErrors.avatar
                      : fieldErrors.imageType
                        ? fieldErrors.imageType
                        : fieldErrors.imageSize
                    : ''}
                </span>
              </div>
              <div className={styles.imageInfo}>
                {selectedFile && (
                  <div className={styles.fileInfo}>
                    <p>File selected: {selectedFile.name}</p>
                    <p>Size: {(selectedFile.size / 1024).toFixed(2)} KB</p>
                    <p>Type: {selectedFile.type}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="terms" className={styles.checkboxLabel}>
            <input id="terms" type="checkbox" ref={agreeToTermsRef} />I accept
            the terms of the agreement *
          </label>
          <div className={styles.errorView}>
            <span id="terms-error" className={styles.errorMessage}>
              {fieldErrors ? fieldErrors.terms : ''}
            </span>
          </div>
        </div>
        <button type="submit" className={styles.submitButton}>
          Submit
        </button>
      </form>
    </div>
  );
};
