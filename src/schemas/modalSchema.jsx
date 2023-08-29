import { object, string } from 'yup';

export const modalSchema = object({
  title: string()
    .min(2, 'minimum 2 characters')
    .max(64, 'maximum 32 characters')
    .required(),
});
