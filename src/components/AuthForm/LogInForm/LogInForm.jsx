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
          <a href="https://project-react-node-back.onrender.com/api/users/google" className={styles.authGoogleLink}>
              <svg className={styles.googleIcon} width="24" height="24" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z"
                  fillRule="evenodd"
                  fillOpacity="1"
                  fill="#4285f4"
                  stroke="none">
                </path>
                <path
                  d="M9.003 18c2.43 0 4.467-.806 5.956-2.18L12.05 13.56c-.806.54-1.836.86-3.047.86-2.344 0-4.328-1.584-5.036-3.711H.96v2.332C2.44 15.983 5.485 18 9.003 18z"
                  fillRule="evenodd"
                  fillOpacity="1"
                  fill="#34a853"
                  stroke="none">
                </path>
                <path
                  d="M3.964 10.712c-.18-.54-.282-1.117-.282-1.71 0-.593.102-1.17.282-1.71V4.96H.957C.347 6.175 0 7.55 0 9.002c0 1.452.348 2.827.957 4.042l3.007-2.332z"
                  fillRule="evenodd"
                  fillOpacity="1"
                  fill="#fbbc05"
                  stroke="none">
                </path>
                <path
                  d="M9.003 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.464.891 11.428 0 9.002 0 5.485 0 2.44 2.017.96 4.958L3.967 7.29c.708-2.127 2.692-3.71 5.036-3.71z"
                  fillRule="evenodd"
                  fillOpacity="1"
                  fill="#ea4335"
                  stroke="none">
                </path>
            </svg>
            Continue with Google
          </a>
        </Form>
      )}
    </Formik>
  );
};
