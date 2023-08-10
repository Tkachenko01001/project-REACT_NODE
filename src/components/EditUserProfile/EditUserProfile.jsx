import { useState } from 'react';
// import { useDispatch } from 'react-redux';
import Modal from '../Modal/Modal';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { object, string, mixed } from 'yup';
import { EyeOpen } from '../AuthForm/EyeOpen/EyeOpen';
import { EyeClose } from '../AuthForm/EyeClose/EyeClose';
import { Loader } from '../Loader/Loader';
import styles from './EditUserProfile.module.css';
import Avatar from 'components/Avatar/Avatar';
import { Previews } from 'components/AvatarModal/AvatarModal';

const initialValues = {
  avatarURL: null,
  name: '',
  email: '',
  password: '',
};

export const registerSchema = object({
  avatarURL: mixed().required('Image is required'),
  name: string()
    .min(2, 'minimum 2 characters')
    .max(32, 'maximum 32 characters')
    .test(
      'only-allowed-chars',
      'password can contain: only Latin, numbers, special characters',
      value => /^[a-zA-Z0-9\-!@#$%^&*()_+,.:;’“?/]+$/.test(value)
    )
    .matches(/^[a-zA-Z0-9 !@#$%^&*()_+,.:;’“?/-]+$/, 'Invalid name format')
    .required(),
  email: string()
    .email()
    .matches(/^[a-zA-Z0-9]+@[a-zA-Z]+\.[a-zA-Z]{2,3}$/, 'Invalid email format')
    .required(),
  password: string()
    .min(8, 'minimum 8 characters')
    .max(64, 'maximum 64 characters')
    .test(
      'no-spaces',
      'Invalid format: without spaces',
      value => !/\s/.test(value)
    )
    .test(
      'only-allowed-chars',
      'password can contain: only Latin, numbers, special characters',
      value => /^[a-zA-Z0-9\-!@#$%^&*()_+,.:;’“?/]+$/.test(value)
    )
    .matches(/^[a-zA-Z0-9\-!@#$%^&*()_+,.:;’“?/]+$/, 'Invalid password format')
    .required(),
});

export const EditUserProfile = () => {
  // const dispatch = useDispatch();
  const [avatarURL, setAvatarURL] = useState('');
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

  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => setIsModalOpen(state => !state);

  const handleChange = ({ target: { name, value } }, setFieldValue) => {
    setFieldValue(name, value);
    switch (name) {
      case 'avatarURL':
        return setAvatarURL(value);
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
    <div>
      <Avatar size={32} onClick={toggleModal} />
      {isModalOpen && (
        <Modal onClose={toggleModal}>
          <Formik
            initialValues={initialValues}
            validationSchema={registerSchema}
            onSubmit={(values, { setSubmitting, resetForm }) => {
              // dispatch(
              //   register({
              //     avatarURL: avatarURL,
              //     name: name,
              //     email: email.toLowerCase(),
              //     password: password,
              //   })
              // );
              console.log(
                'Avatar URL:',
                values.avatarURL ? URL.createObjectURL(values.avatarURL) : null
              );

              console.log(values);
              // setAvatarURL('');
              // setEmail('');
              // setName('');
              // setPassword('');
              setSubmitting(false);
              resetForm();
            }}
          >
            {({ errors, values, setFieldValue }) => (
              <Form autoComplete="off" className={styles.form}>
                <div className={styles.wrap}>
                  <Previews />
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
                    setFieldValue('avatarURL', avatarURL);
                    setFieldValue('name', name);
                    setFieldValue('email', email);
                    setFieldValue('password', password);
                  }}
                >
                  <div className={styles.wrap}>
                    <span>Send</span>
                    <Loader />
                  </div>
                </button>
              </Form>
            )}
          </Formik>
        </Modal>
      )}
    </div>
  );
};
