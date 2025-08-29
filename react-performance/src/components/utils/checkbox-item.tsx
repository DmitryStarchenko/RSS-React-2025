import { memo } from 'react';
import type { AvailableColumn } from '../../shared/types/types';
import styles from '../styles/checkbox-item.module.css';

export const CheckboxItem = memo(
  ({ column, onToggle }: { column: AvailableColumn; onToggle: () => void }) => {
    return (
      <label key={column.key} className={styles.checkboxLabel}>
        <input type="checkbox" checked={column.selected} onChange={onToggle} />
        {column.label}
      </label>
    );
  },
);

CheckboxItem.displayName = 'CheckboxItem';
