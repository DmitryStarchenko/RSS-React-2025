import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
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
import {
  setInfo,
  useAppDispatch,
  useAppSelector,
} from '../../shared/store/store';

type Props = {
  isShowing: boolean;
  hide: () => void;
};

export function ControlledForm({ isShowing, hide }: Props) {
  const dispatch = useAppDispatch();
  const countries = useAppSelector((state: RootState) => state.countries.list);
  const [formId] = useState('controlledForm');
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormData>({
    resolver: yupResolver(validationSchema),
    mode: 'onChange',
  });
  useClickOutside(formId, hide, isShowing);
  useEscapeKey(hide);

  const onSubmit = (data: FormData) => {
    delete data.avatar;
    dispatch(setInfo(data));
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
            <UploadImage
              register={register}
              setValue={setValue}
              errors={errors}
            />
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
