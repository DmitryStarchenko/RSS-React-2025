import { ComponentsProps } from '../types';
import styles from '../form.module.css';

export function Age({ register, errors }: ComponentsProps) {
  return (
    <div className={styles.formGroup}>
      <label htmlFor="age">Age *</label>
      <input
        id="age"
        type="number"
        {...register('age', { valueAsNumber: true })}
        className={errors.age ? `${styles.error}` : ''}
      />
      <div className={styles.errorView}>
        {errors.age && (
          <span className={styles.errorMessage}>{errors.age.message}</span>
        )}
      </div>
    </div>
  );
}
