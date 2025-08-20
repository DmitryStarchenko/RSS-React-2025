import { ComponentsProps } from '../types';
import styles from '../form.module.css';

export function Password({ register, errors }: ComponentsProps) {
  return (
    <>
      <div className={styles.formGroup}>
        <label htmlFor="password">Password *</label>
        <input
          id="password"
          type="password"
          {...register('password')}
          className={errors.password ? `${styles.error}` : ''}
        />
        <div className={styles.errorView}>
          {errors.password && (
            <span className={styles.errorMessage}>
              {errors.password.message}
            </span>
          )}
        </div>
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="confirmPassword">Confirm password *</label>
        <input
          id="confirmPassword"
          type="password"
          {...register('confirmPassword')}
          className={errors.confirmPassword ? `${styles.error}` : ''}
        />
        <div className={styles.errorView}>
          {errors.confirmPassword && (
            <span className={styles.errorMessage}>
              {errors.confirmPassword.message}
            </span>
          )}
        </div>
      </div>
    </>
  );
}
