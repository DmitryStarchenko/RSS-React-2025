import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { RootState } from './types';
import { FormData } from '../../globalTypes';
import styles from '../../shared/form.module.css';
import {
  setInfo,
  useAppDispatch,
  useAppSelector,
  useClickOutside,
  useEscapeKey,
  validationSchema,
} from '../../shared';
import {
  Age,
  Country,
  Email,
  Gender,
  Name,
  Password,
  TermsAgreement,
  UploadImage,
} from './components';

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
