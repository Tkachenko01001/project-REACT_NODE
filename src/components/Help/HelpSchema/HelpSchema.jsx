import { object, string } from 'yup';

export const HelpSchema = object({
  email: string()
    .email()
    .matches(/^[a-zA-Z0-9]+@[a-zA-Z]+\.[a-zA-Z]{2,3}$/, 'Invalid email format')
    .required(),
  comment: string()
    .min(10, 'Minimum 10 characters')
    .max(256, 'Maximum 256 characters')
    .required('comment is a required field'),
});
