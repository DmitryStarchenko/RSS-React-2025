import { ComponentsProps } from '../types';
import styles from '../../../shared/form.module.css';

export function Name({ register, errors }: ComponentsProps) {
  return (
    <div className={styles.formGroup}>
      <label htmlFor="firstName">Name *</label>
      <input
        id="firstName"
        type="text"
        {...register('firstName')}
        className={errors.firstName ? `${styles.error}` : ''}
      />
      <div className={styles.errorView} data-testid="error-view">
        {errors.firstName && (
          <span className={styles.errorMessage}>
            {errors.firstName.message}
          </span>
        )}
      </div>
    </div>
  );
}
