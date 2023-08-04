import { useState } from 'react';
import { object, string } from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import styles from '../AuthForm.module.css';
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

  const FormError = ({ name }) => {
    return (
      <ErrorMessage
        name={name}
        render={message => <p className={styles.error}>{message}</p>}
      />
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
      <Form autoComplete="off" className={styles.form}>
        <div className={styles.wrap}>
          <Field
            className={styles.input}
            type="text"
            name="name"
            placeholder="Enter your name"
            // value={email}
            // onChange={handleChange}
          />
          <FormError name="name" />
        </div>

        <div className={styles.wrap}>
          <Field
            className={styles.input}
            type="email"
            name="email"
            placeholder="Enter your email"
            // value={email}
            // onChange={handleChange}
          />
          <FormError name="email" />
        </div>

        <div className={styles.wrap}>
          <Field
            className={styles.input}
            type={passwordShown ? 'text' : 'password'}
            name="password"
            placeholder="Create a password"
            // value={password}
            // onChange={handleChange}
          />

          <span className={styles.yey_icon} onClick={togglPassword}>
            {passwordIcon}
          </span>
          <FormError name="password" />
        </div>

        <button className={styles.btn} type="submit">
          Register Now
        </button>
      </Form>
    </Formik>
  );
};
