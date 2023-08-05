import { useState } from 'react';
import { object, string } from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import styles from '../AuthForm.module.css';
import sprite from '../../../images/sprite.svg';
import { useDispatch } from 'react-redux';
import { register } from 'redux/auth/operations';

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

const YeyOpen = () => {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18">
      <path
        d="M0.75 9C0.75 9 3.75 3 9 3C14.25 3 17.25 9 17.25 9C17.25 9 14.25 15 9 15C3.75 15 0.75 9 0.75 9Z"
        stroke="white"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 11.25C10.2426 11.25 11.25 10.2426 11.25 9C11.25 7.75736 10.2426 6.75 9 6.75C7.75736 6.75 6.75 7.75736 6.75 9C6.75 10.2426 7.75736 11.25 9 11.25Z"
        stroke="white"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
    // <svg className={styles.svg}>
    //   <use href={sprite + '#icon-eye'} />
    // </svg>
  );
};

const YeyClose = () => {
  return (
    <svg className={styles.svg}>
      <use href={sprite + '#icon-eye'} />
    </svg>
  );
};

export const RegisterForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const [passwordShown, setPasswordShown] = useState(false);
  const [passwordIcon, setpasswordIcon] = useState(<YeyClose />);

  const dispatch = useDispatch();
  

  const togglPassword = () => {
    setPasswordShown(!passwordShown);
    setpasswordIcon(!passwordShown ? <YeyOpen /> : <YeyClose />);
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
            onChange={e =>  setName(e.target.value)}
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
