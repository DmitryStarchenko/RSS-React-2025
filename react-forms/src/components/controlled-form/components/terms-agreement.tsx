import { ComponentsProps } from '../types';
import styles from '../form.module.css';

export function TermsAgreement({ register, errors }: ComponentsProps) {
  return (
    <div className={styles.formGroup}>
      <label htmlFor="terms" className={styles.checkboxLabel}>
        <input id="terms" type="checkbox" {...register('terms')} />I accept the
        terms of the agreement *
      </label>
      <div className={styles.errorView}>
        {errors.terms && (
          <span className={styles.errorMessage}>{errors.terms.message}</span>
        )}
      </div>
    </div>
  );
}
