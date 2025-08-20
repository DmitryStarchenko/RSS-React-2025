import { useDispatch, useSelector } from 'react-redux';
import { clearImage, setImage } from '../../../shared/store/store';
import styles from '../form.module.css';
import { useState } from 'react';
import { UseFormClearErrors, UseFormSetError } from 'react-hook-form';
import { FormData, RootState } from '../types';

type Props = {
  clearErrors: UseFormClearErrors<FormData>;
  setError: UseFormSetError<FormData>;
};

export function UploadImage({ clearErrors, setError }: Props) {
  const dispatch = useDispatch();
  const storedImage = useSelector((state: RootState) => state.image);
  const [fileError, setFileError] = useState<string>('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const validateFile = (file: File): boolean => {
    setFileError('');
    clearErrors('avatar');
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (!allowedTypes.includes(file.type)) {
      const errorMsg = 'Only JPG and PNG files are allowed';
      setFileError(errorMsg);
      setError('avatar', { type: 'manual', message: errorMsg });
      return false;
    }

    const maxSize = 4 * 1024 * 1024;
    if (file.size > maxSize) {
      const errorMsg = 'File is too big. Max size: 4MB';
      setFileError(errorMsg);
      setError('avatar', { type: 'manual', message: errorMsg });
      return false;
    }

    return true;
  };

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const files = event.target.files;

    if (!files || files.length === 0) {
      dispatch(clearImage());
      setSelectedFile(null);
      setFileError('');
      clearErrors('avatar');
      return;
    }

    const file = files[0];
    setSelectedFile(file);

    if (!validateFile(file)) {
      dispatch(clearImage());
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        dispatch(
          setImage({
            data: typeof e.target.result === 'string' ? e.target.result : '',
            name: file.name,
          }),
        );
      }
    };
    reader.onerror = () => {
      setFileError('Error reading file');
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className={styles.formGroup}>
      <label htmlFor="avatar">Upload image</label>
      <input
        className={styles.inputFile}
        id="avatar"
        type="file"
        accept=".jpg,.jpeg,.png"
        onChange={handleImageUpload}
      />
      <label htmlFor="avatar" className={styles.customFileButton}>
        <span className={styles.buttonText}>Select file</span>
      </label>
      <div className={styles.errorView}>
        {fileError && <span className={styles.errorMessage}>{fileError}</span>}
      </div>
      <div className={styles.imageInfo}>
        {storedImage.data && !fileError && (
          <img
            className={styles.imagePreview}
            src={storedImage.data}
            alt="Preview"
          />
        )}
        {selectedFile && !fileError && (
          <div className={styles.fileInfo}>
            <p>File selected: {selectedFile.name}</p>
            <p>Size: {(selectedFile.size / 1024).toFixed(2)} KB</p>
            <p>Type: {selectedFile.type}</p>
          </div>
        )}
      </div>
    </div>
  );
}
