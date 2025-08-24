import { boolean, mixed, number, object, ref, string } from 'yup';

const MAX_SIZE_BYTES = 4 * 1024 * 1024;

export const validationSchema = object({
  firstName: string()
    .required('Name is required')
    .test('capitalized', 'The first letter must be capitalized', (value) => {
      return value ? value[0] === value[0].toUpperCase() : false;
    }),

  age: number()
    .typeError('Age must be a number')
    .required('Age is required')
    .positive('Age cannot be negative')
    .integer('Age must be an integer'),

  email: string().required('Email is required').email('Incorrect email format'),

  password: string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters long')
    .matches(/[0-9]/, 'The password must contain at least one number.')
    .matches(/[A-Z]/, 'The password must contain at least one capital letter.')
    .matches(
      /[a-z]/,
      'The password must contain at least one lowercase letter.',
    )
    .matches(
      /[^A-Za-z0-9]/,
      'The password must contain at least one special character.',
    ),

  confirmPassword: string()
    .required('Password confirmation is required')
    .oneOf([ref('password')], 'The passwords do not match'),

  gender: string().required('Select gender'),

  terms: boolean().oneOf([true], 'You must accept the terms and conditions'),

  country: string().required('Select country'),

  avatar: mixed<File>().required('Image is required'),

  imageType: mixed<string>()
    .required('Image is required')
    .test('fileType', 'Only JPG and PNG files are allowed', (value: string) => {
      if (!value) return false;
      return ['image/jpeg', 'image/png', 'image/jpg'].includes(value);
    }),

  imageSize: mixed<number>().test(
    'fileSize',
    'File is too big. Max size: 4MB',
    (value: number) => {
      if (!value) return false;
      return value <= MAX_SIZE_BYTES;
    },
  ),
});
