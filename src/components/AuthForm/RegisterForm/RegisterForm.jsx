import { useState } from 'react';
import { object, string } from 'yup';
import Notiflix from 'notiflix';
import { Button } from './RegisterForm.styled';
import { FormikForm } from './RegisterForm.styled';
import { Formik, ErrorMessage } from 'formik';
import { Input, ShowHidePass, Password } from './RegisterForm.styled';
import { BiSolidShow, BiSolidHide } from 'react-icons/bi';

const registerSchema = object({
  name: string().required(),
  email: string().email().required(),
  password: string().required(),
});

const initialValues = {
  name: '',
  email: '',
  password: '',
};

export const RegisterForm = () => {
  const [passwordShown, setPasswordShown] = useState(false);
  const [passwordIcon, setpasswordIcon] = useState(
    <BiSolidHide color="#FFFFFF" size="18" />
  );

  const togglPassword = () => {
    setPasswordShown(!passwordShown);
    setpasswordIcon(
      !passwordShown ? (
        <BiSolidShow color="#FFFFFF" size="18" />
      ) : (
        <BiSolidHide color="#FFFFFF" size="18" />
      )
    );
  };

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
          type="text"
          name="name"
          placeholder="Enter your name"
          // value={email}
          // onChange={handleChange}
        />
        <ErrorMessage name="name" component="p" />

        <Input
          type="email"
          name="email"
          placeholder="Enter your email"
          // value={email}
          // onChange={handleChange}
        />
        <ErrorMessage name="email" component="p" />

        <Password>
          <Input
            type={passwordShown ? 'text' : 'password'}
            name="password"
            placeholder="Create a password"
            // value={password}
            // onChange={handleChange}
          />

          <ShowHidePass onClick={togglPassword}>{passwordIcon}</ShowHidePass>
        </Password>

        <ErrorMessage name="password" component="p" />

        <Button type="submit">Register Now</Button>
      </FormikForm>
    </Formik>
  );
};
