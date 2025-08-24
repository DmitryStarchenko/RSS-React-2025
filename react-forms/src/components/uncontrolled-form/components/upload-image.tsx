import { useState } from 'react';
import {
  clearImage,
  setImage,
  useAppDispatch,
} from '../../../shared/store/store';
import { FormData } from '../../../globalTypes';
import styles from '../../../shared/form.module.css';

type Props = {
  setFieldErrors: React.Dispatch<
    React.SetStateAction<Partial<Record<keyof FormData, string>>>
  >;
  fieldErrors: Partial<Record<keyof FormData, string>>;
  avatarRef: React.RefObject<HTMLInputElement>;
};

export function UploadImage({ setFieldErrors, fieldErrors, avatarRef }: Props) {
  const dispatch = useAppDispatch();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const files = event.target.files;
    const newErrors: Partial<Record<keyof FormData, string>> = {};

    if (!files || files.length === 0) {
      dispatch(clearImage());
      setSelectedFile(null);
      newErrors['avatar'] = '';
      setFieldErrors(newErrors);
      return;
    }

    const file = files[0];
    setSelectedFile(file);

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
      newErrors['avatar'] = 'Error reading file';
      setFieldErrors(newErrors);
    };
    reader.readAsDataURL(file);
  };
  return (
    <div className={styles.formGroup}>
      <label htmlFor="avatar">Upload image *</label>
      <input
        ref={avatarRef}
        className={styles.inputFile}
        id="avatar"
        type="file"
        name="avatar"
        onChange={handleImageUpload}
      />
      <label htmlFor="avatar" className={styles.customFileButton}>
        <span className={styles.buttonText}>Select file</span>
      </label>
      <div className={styles.errorView}>
        <span id="avatar-error" className={styles.errorMessage}>
          {fieldErrors
            ? fieldErrors.avatar
              ? fieldErrors.avatar
              : fieldErrors.imageType
                ? fieldErrors.imageType
                : fieldErrors.imageSize
            : ''}
        </span>
      </div>
      <div className={styles.imageInfo}>
        {selectedFile && (
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
