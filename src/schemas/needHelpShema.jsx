import { object, string } from 'yup';

export const needHelpSchema = object({
  email: string()
    .email()
    .matches(/^[a-zA-Z0-9]+@[a-zA-Z]+\.[a-zA-Z]{2,3}$/, 'Invalid email format')
    .required(),
  comment: string().min(10, 'minimum 10 characters').required(),
});
