import { ReactElement } from 'react';
import styles from '../styles/list.module.css';
import { Results } from '../../../../types';

export function List(props: Results): ReactElement {
  return (
    <li className={styles.listItem}>
      <p className={styles.liName}>{props.name}</p>
      <p
        className={
          styles.description
        }>{`Pokemon id: ${props.url.slice(34).slice(0, -1)}`}</p>
    </li>
  );
}
