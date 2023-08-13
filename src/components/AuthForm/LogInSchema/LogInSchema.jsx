import { object, string } from 'yup';

export const logInSchema = object({
  email: string()
    .email()
    .matches(/^[a-zA-Z0-9]+@[a-zA-Z]+\.[a-zA-Z]{2,3}$/, 'Invalid email format')
    .required(),
  password: string()
    .min(8, 'minimum 8 characters')
    .max(64, 'maximum 64 characters')
    .test(
      'no-spaces',
      'Invalid format: without spaces',
      value => !/\s/.test(value)
    )
    .test(
      'only-allowed-chars',
      'password can contain: only Latin, numbers, special characters',
      value => /^[a-zA-Z0-9\-!@#$%^&*()_+,.:;’“?/]+$/.test(value)
    )
    .matches(/^[a-zA-Z0-9\-!@#$%^&*()_+,.:;’“?/]+$/, 'Invalid password format')
    .required(),
});