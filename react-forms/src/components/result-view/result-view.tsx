import styles from './result-view.module.css';
import { useAppSelector } from '../../shared/store/store';

type Props = {
  isShowing: boolean;
};

export function ResultView({ isShowing }: Props) {
  const {
    age,
    firstName,
    country,
    password,
    confirmPassword,
    terms,
    gender,
    email,
  } = useAppSelector((state) => state.allInfo);
  const { data, name } = useAppSelector((state) => state.image);
  return age && !isShowing ? (
    <>
      <h1>Result</h1>
      <div className={styles.result}>
        <p className={styles.item}>Name: {firstName}</p>
        <p className={styles.item}>Age: {age}</p>
        <p className={styles.item}>Country: {country}</p>
        <p className={styles.item}>Email: {email}</p>
        <p className={styles.item}>Gender: {gender}</p>
        <p className={styles.item}>Password: {password}</p>
        <p className={styles.item}>Confirm password: {confirmPassword}</p>
        <p className={styles.item}>
          Term: {terms ? 'agreed' : 'did not agree'}
        </p>
        <p className={styles.item}>Image: {name}</p>
        <img className={styles.image} src={data} alt="image" />
      </div>
    </>
  ) : null;
}
