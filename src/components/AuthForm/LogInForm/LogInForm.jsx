import { object, string } from 'yup';
import { Button } from './LogInForm.styled';
import { FormikForm } from './LogInForm.styled';
import { Formik, ErrorMessage } from 'formik';
import { Input } from './LogInForm.styled';

const registerSchema = object({
  email: string().email().required(),
  password: string().required(),
});

const initialValues = {
  email: '',
  password: '',
};

export const LogInForm = () => {
  const handleSubmit = (values, { resetForm }) => {
    console.log(values);
    resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={registerSchema}
    >
      <FormikForm autoComplete="off">
        <Input
          type="email"
          name="email"
          placeholder="Enter your email"
          // value={email}
          // onChange={handleChange}
        />
        <ErrorMessage name="email" />

        <Input
          type="password"
          name="password"
          placeholder="Create a password"
          // value={password}
          // onChange={handleChange}
        />
        <ErrorMessage name="password" />

        <Button type="submit">Register Now</Button>
      </FormikForm>
    </Formik>
  );
};
