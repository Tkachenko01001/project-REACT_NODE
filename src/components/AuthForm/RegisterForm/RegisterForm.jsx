import { useState } from 'react';
// import { object, string } from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { EyeOpen } from '../EyeOpen/EyeOpen';
import { EyeClose } from '../EyeClose/EyeClose';
import styles from './RegisterForm.module.css';

import { useDispatch } from 'react-redux';
import { register } from 'redux/auth/operations';

// const registerSchema = object({
//   name: string().required(),
//   email: string().email().required(),
//   password: string().required(),
// });

const initialValues = {
  name: '',
  email: '',
  password: '',
};

export const RegisterForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [passwordShown, setPasswordShown] = useState(false);
  const [passwordIcon, setpasswordIcon] = useState(<EyeClose />);

  const dispatch = useDispatch();

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

  const handleSubmit = () => {
    dispatch(
      register({
        name: name,
        email: email,
        password: password,
      })
    );
    // resetForm();
    setEmail('');
    setName('');
    setPassword('');
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      // validationSchema={registerSchema}
    >
      <Form autoComplete="off" className={styles.form}>
        <div className={styles.wrap}>
          <Field
            className={styles.input}
            type="text"
            name="name"
            placeholder="Enter your name"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <FormError name="name" />
        </div>

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
          Register Now
        </button>
      </Form>
    </Formik>
  );
};
