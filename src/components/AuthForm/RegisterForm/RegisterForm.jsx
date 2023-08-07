import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { registerSchema } from '../RegisterSchema/RegisterSchema';
import { EyeOpen } from '../EyeOpen/EyeOpen';
import { EyeClose } from '../EyeClose/EyeClose';
import { register } from 'redux/auth/operations';
import { Loader } from '../../Loader/Loader';
import styles from './RegisterForm.module.css';

const initialValues = {
  name: '',
  email: '',
  password: '',
};

export const RegisterForm = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
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
      case 'name':
        return setName(value);
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
      validationSchema={registerSchema}
      onSubmit={(values, { setSubmitting }) => {
        dispatch(
          register({
            name: name,
            email: email,
            password: password,
          })
        );
        setEmail('');
        setName('');
        setPassword('');
        setSubmitting(false);
      }}
    >
      {({ errors, setFieldValue }) => (
        <Form autoComplete="off" className={styles.form}>
          <div className={styles.wrap}>
            <Field
              className={styles.input}
              type="text"
              name="name"
              placeholder="Enter your name"
              value={name}
              onChange={e => handleChange(e, setFieldValue)}
            />
            {errors.name && <FormError name="name" />}
          </div>

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
              placeholder="Create a password"
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
              setFieldValue('name', name);
              setFieldValue('email', email);
              setFieldValue('password', password);
            }}
          >
            <div className={styles.wrap}>
              <span>Register Now</span>
              <Loader />
            </div>
          </button>
        </Form>
      )}
    </Formik>
  );
};
