import { useState } from 'react';
import { object, string } from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { EyeOpen } from '../EyeOpen/EyeOpen';
import { EyeClose } from '../EyeClose/EyeClose';
import styles from './LoginForm.module.css';

import { useDispatch } from 'react-redux';
import { logIn } from 'redux/auth/operations';

const registerSchema = object({
  email: string()
    .email()
    .matches(/^[a-zA-Z0-9]+@[a-zA-Z]+\.[a-zA-Z]{2,3}$/, 'Invalid email format')
    .required(),
  password: string()
    .matches(
      /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]+$/,
      'Invalid password format'
    )
    .required(),
});

const initialValues = {
  email: '',
  password: '',
};

export const LogInForm = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [passwordShown, setPasswordShown] = useState(false);
  const [passwordIcon, setpasswordIcon] = useState(<EyeClose />);

  const togglPassword = () => {
    setPasswordShown(!passwordShown);
    setpasswordIcon(!passwordShown ? <EyeOpen /> : <EyeClose />);
  };

  const FormError = ({ name }) => {
    return (
      <ErrorMessage
        name={name}
        render={message => <p className={styles.error}>{message}</p>}
      />
    );
  };

  // const handleSubmit = (values, { resetForm }) => {
  //   console.log(values);
  //   resetForm();
  // };

  const handleSubmit = (values, { resetForm }) => {
    dispatch(
      logIn({
        email: email,
        password: password,
      })
    );
    setEmail('');
    setPassword('');
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
            type="email"
            name="email"
            placeholder="Enter your email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <FormError name="email" />
        </div>

        <div className={styles.wrap}>
          <Field
            className={styles.input}
            type={passwordShown ? 'text' : 'password'}
            name="password"
            placeholder="Create a password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />

          <span className={styles.eye_icon} onClick={togglPassword}>
            {passwordIcon}
          </span>
          <FormError name="password" />
        </div>

        <button className={styles.btn} type="submit">
          Log In Now
        </button>
      </Form>
    </Formik>
  );
};
