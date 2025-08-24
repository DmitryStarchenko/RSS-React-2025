import { useState } from 'react';
import { FieldErrors, UseFormRegister, UseFormSetValue } from 'react-hook-form';
import styles from '../../../shared/form.module.css';
import { RootState } from '../types';
import { FormData } from '../../../globalTypes';
import {
  clearImage,
  setImage,
  useAppDispatch,
  useAppSelector,
} from '../../../shared';

type Props = {
  errors: FieldErrors<FormData>;
  setValue: UseFormSetValue<FormData>;
  register: UseFormRegister<FormData>;
};

export function UploadImage({ errors, setValue, register }: Props) {
  const dispatch = useAppDispatch();
  const storedImage = useAppSelector((state: RootState) => state.image);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const files = event.target.files;
    if (!files || files.length === 0) {
      dispatch(clearImage());
      setSelectedFile(null);
      return;
    }

    const file = files[0];
    setValue('avatar', file, { shouldValidate: true });
    setValue('imageType', file.type, { shouldValidate: true });
    setValue('imageSize', file.size, { shouldValidate: true });
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
    reader.readAsDataURL(file);
  };

  return (
    <div className={styles.formGroup}>
      <label htmlFor="avatar">Upload image *</label>
      <input
        className={styles.inputFile}
        id="avatar"
        type="file"
        {...register('avatar')}
        onChange={handleImageUpload}
      />
      <label htmlFor="avatar" className={styles.customFileButton}>
        <span className={styles.buttonText}>Select file</span>
      </label>
      <div className={styles.errorView}>
        {errors.imageType ? (
          <span className={styles.errorMessage}>
            {errors.imageType.message}
          </span>
        ) : errors.imageSize ? (
          <span className={styles.errorMessage}>
            {errors.imageSize.message}
          </span>
        ) : (
          ''
        )}
      </div>
      <div className={styles.imageInfo}>
        {selectedFile && !errors.imageSize && !errors.imageType && (
          <img
            className={styles.imagePreview}
            src={storedImage.data}
            alt="Preview"
          />
        )}
        {selectedFile && !errors.imageSize && !errors.imageType && (
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
