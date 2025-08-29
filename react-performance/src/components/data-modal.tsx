import { memo } from 'react';
import type { AvailableColumn } from '../shared/types/types';
import styles from './styles/data-modal.module.css';
import { CheckboxItem } from './utils/checkbox-item';

interface DataModalProps {
  isOpen: boolean;
  onClose: () => void;
  availableColumns: AvailableColumn[];
  onColumnToggle: (key: string) => void;
}

export const DataModal = memo(
  ({ isOpen, onClose, availableColumns, onColumnToggle }: DataModalProps) => {
    if (!isOpen) return null;

    return (
      <div className={styles.modalOverlay} onClick={onClose}>
        <div
          className={styles.modalContent}
          onClick={(event) => event.stopPropagation()}>
          <div className={styles.modalHeader}>
            <h3>Select Additional Columns</h3>
          </div>

          <div className={styles.modalBody}>
            {availableColumns.map((column) => (
              <CheckboxItem
                key={column.key}
                column={column}
                onToggle={() => onColumnToggle(column.key)}
              />
            ))}
          </div>
          <div className={styles.modalFooter}>
            <button className={styles.closeButton} onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    );
  },
);

DataModal.displayName = 'DataModal';
