import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { FormData } from '../../globalTypes';

export interface ImageState {
  data: string | null;
  name: string;
}

export interface CountriesState {
  list: string[];
}

export interface RootState {
  countries: CountriesState;
  image: ImageState;
}

export interface ComponentsProps {
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
}
