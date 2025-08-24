export interface Data {
  age: number;
  confirmPassword: string;
  country: string;
  email: string;
  firstName: string;
  gender: string;
  password: string;
  terms: boolean;
}

export interface FormData {
  firstName: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  terms: boolean;
  country: string;
  avatar: File;
  imageType: string;
  imageSize: number;
}
