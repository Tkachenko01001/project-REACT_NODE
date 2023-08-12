import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { logInSchema } from '../LogInSchema/LogInSchema';
import { EyeOpen } from '../EyeOpen/EyeOpen';
import { EyeClose } from '../EyeClose/EyeClose';
import { logIn } from 'redux/auth/operations';
import { Loader } from '../../Loader/Loader';
import styles from './LoginForm.module.css';
import { selectIsLoggedIn } from 'redux/auth/selectors';
import { store } from 'redux/store';

const initialValues = {
  email: '',
  password: '',
};

export const LogInForm = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
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

  const handleChange = ({ target: { name, value } }, setFieldValue) => {
    setFieldValue(name, value);
    switch (name) {
      case 'email':
        return setEmail(value);
      case 'password':
        return setPassword(value);
      default:
        return;
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={logInSchema}
      onSubmit={(values, { setSubmitting }) => {
        dispatch(
          logIn({
            email: email.toLowerCase(),
            password: password,
          })
        );

        if (!isLoggedIn) return;

        setEmail('');
        setPassword('');
        setSubmitting(false);
      }}
    >
      {({ errors, setFieldValue }) => (
        <Form autoComplete="off" className={styles.form}>
          <div className={styles.wrap}>
            <Field
              className={styles.input}
              type="email"
              name="email"
              placeholder="Enter your email"
              value={email}
              onChange={e => handleChange(e, setFieldValue)}
            />
            {errors.email && <FormError name="email" />}
          </div>

          <div className={styles.wrap}>
            <Field
              className={styles.input}
              type={passwordShown ? 'text' : 'password'}
              name="password"
              placeholder="Confirm a password"
              value={password}
              onChange={e => handleChange(e, setFieldValue)}
            />

            <span className={styles.eye_icon} onClick={togglPassword}>
              {passwordIcon}
            </span>
            {errors.password && <FormError name="password" />}
          </div>

          <button
            className={styles.btn}
            type="submit"
            onClick={() => {
              setFieldValue('email', email);
              setFieldValue('password', password);
            }}
          >
            <div className={styles.wrap}>
              <span>Log In Now</span>
              <Loader />
            </div>
          </button>
        </Form>
      )}
    </Formik>
  );
};
