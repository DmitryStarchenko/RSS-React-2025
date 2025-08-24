import { useRef, FormEvent, useState } from 'react';
import styles from '../../shared/form.module.css';
import { ValidationError } from 'yup';
import { FormData } from '../../globalTypes';
import {
  clearImage,
  setInfo,
  useAppDispatch,
  useClickOutside,
  useEscapeKey,
  validationSchema,
} from '../../shared';
import { Country, UploadImage } from './components';

type Props = {
  isShowing: boolean;
  hide: () => void;
};

export const UncontrolledForm = ({ isShowing, hide }: Props) => {
  const dispatch = useAppDispatch();
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
            <Country countryRef={countryRef} fieldErrors={fieldErrors} />
            <UploadImage
              setFieldErrors={setFieldErrors}
              fieldErrors={fieldErrors}
              avatarRef={avatarRef}
            />
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
