import { object, string } from 'yup';

export const logInSchema = object({
  email: string()
    .email()
    .matches(/^[a-zA-Z0-9]+@[a-zA-Z]+\.[a-zA-Z]{2,3}$/, 'Invalid email format')
    .required(),
  password: string()
    .min(8, 'minimum 8 characters')
    .max(64, 'maximum 64 characters')
    .matches(
      /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]+$/,
      'Invalid password format'
    )
    .required(),
});
