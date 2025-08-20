import { FieldErrors, UseFormRegister } from 'react-hook-form';

export interface FormData {
  firstName: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  terms: boolean;
  country: string;
  avatar: FileList | null;
}

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
