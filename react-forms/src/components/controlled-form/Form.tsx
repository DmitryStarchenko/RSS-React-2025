import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSelector } from 'react-redux';
import { validationSchema } from './validationSchema';
import { FormData, RootState } from './types';
import styles from './form.module.css';
import { Name } from './components/name';
import { Age } from './components/age';
import { Email } from './components/email';
import { Password } from './components/password';
import { Gender } from './components/gender';
import { UploadImage } from './components/upload-image';
import { TermsAgreement } from './components/terms-agreement';
import { Country } from './components/country';
import { useClickOutside } from '../../shared/hooks/useClickOutside';
import { useEscapeKey } from '../../shared/hooks/useEscapeKey';
import { useState } from 'react';

type Props = {
  isShowing: boolean;
  hide: () => void;
};

export function ControlledForm({ isShowing, hide }: Props) {
  const countries = useSelector((state: RootState) => state.countries.list);
  const [formId] = useState('controlledForm');
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    setError,
    clearErrors,
  } = useForm<FormData>({
    resolver: yupResolver(validationSchema),
    mode: 'onChange',
  });
  useClickOutside(formId, hide, isShowing);
  useEscapeKey(hide);

  const onSubmit = (data: FormData) => {
    console.log(data);
    hide();
  };

  return (
    <div id={formId} className={styles.formContainer}>
      <button className={styles.buttonClose} onClick={hide}>
        X
      </button>
      <h2>Controlled Form</h2>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.formContent}>
          <div className={styles.partForm}>
            <Name register={register} errors={errors} />
            <Age register={register} errors={errors} />
            <Email register={register} errors={errors} />
            <Password register={register} errors={errors} />
          </div>
          <div className={styles.partForm}>
            <Gender register={register} errors={errors} />
            <Country
              setValue={setValue}
              error={errors.country?.message}
              countries={countries}
            />
            <UploadImage clearErrors={clearErrors} setError={setError} />
          </div>
        </div>
        <TermsAgreement register={register} errors={errors} />
        <button type="submit" className={styles.submitButton}>
          Submit
        </button>
      </form>
    </div>
  );
}
