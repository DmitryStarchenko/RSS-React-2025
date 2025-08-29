import type { AvailableColumn } from '../shared/types/types';
import styles from './styles/data-modal.module.css';

interface DataModalProps {
  isOpen: boolean;
  onClose: () => void;
  availableColumns: AvailableColumn[];
  onColumnToggle: (key: string) => void;
}

export const DataModal = ({
  isOpen,
  onClose,
  availableColumns,
  onColumnToggle,
}: DataModalProps) => {
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
            <label key={column.key} className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={column.selected}
                onChange={() => onColumnToggle(column.key)}
              />
              {column.label}
            </label>
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
};
