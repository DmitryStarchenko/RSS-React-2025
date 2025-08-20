import { ComponentsProps } from '../types';
import styles from '../form.module.css';

export function Gender({ register, errors }: ComponentsProps) {
  return (
    <div className={styles.formGroup}>
      <label>Gender *</label>
      <div className={styles.radioGroup}>
        <label htmlFor="male">
          <input id="male" type="radio" value="male" {...register('gender')} />
          Male
        </label>
        <label htmlFor="female">
          <input
            id="female"
            type="radio"
            value="female"
            {...register('gender')}
          />
          Female
        </label>
      </div>
      <div className={styles.errorView}>
        {errors.gender && (
          <span className={styles.errorMessage}>{errors.gender.message}</span>
        )}
      </div>
    </div>
  );
}
