import { ComponentsProps } from '../types';
import styles from '../../../shared/form.module.css';

export function Email({ register, errors }: ComponentsProps) {
  return (
    <div className={styles.formGroup}>
      <label htmlFor="email">Email *</label>
      <input
        id="email"
        type="email"
        {...register('email')}
        className={errors.email ? `${styles.error}` : ''}
      />
      <div className={styles.errorView}>
        {errors.email && (
          <span className={styles.errorMessage}>{errors.email.message}</span>
        )}
      </div>
    </div>
  );
}
