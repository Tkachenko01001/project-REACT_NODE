import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from '../Modal/Modal';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { object, string, mixed } from 'yup';
import { EyeOpen } from '../AuthForm/EyeOpen/EyeOpen';
import { EyeClose } from '../AuthForm/EyeClose/EyeClose';
import { Loader } from '../Loader/Loader';
import styles from './EditUserProfile.module.css';
import Avatar from 'components/Avatar/Avatar';
import { Previews } from 'components/AvatarModal/AvatarModal';
import { updateUser } from 'redux/auth/operations';
import { selectUser } from 'redux/auth/selectors';

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
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const initialValues = {
    avatarURL: user.avatarURL,
    name: user.name,
    email: user.email,
    password: '',
  };

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

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
              dispatch(
                updateUser({
                  // avatarURL: avatarURL,
                  name: values.name,
                  // email: email.toLowerCase(),
                  // password: password,
                })
              );
              // console.log(
              //   'Avatar URL:',
              //   values.avatarURL ? URL.createObjectURL(values.avatarURL) : null
              // );

              console.log(values);

              // setSubmitting(false);
              // resetForm();
            }

  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => setIsModalOpen(state => !state);

  return (
    <div>
      <Avatar size={32} onClick={toggleModal} />
      {isModalOpen && (
        <Modal onClose={toggleModal}>
          <Formik
            initialValues={initialValues}
            validationSchema={registerSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, values, setFieldValue }) => (
              <Form className={styles.form}>
                <div className={styles.wrap}>
                  <p className={styles.title}>Edit profile</p>
                  <Previews
                    value={user.avatarURL}
                    onImageSelect={selectedImage => {
                      setFieldValue('avatarURL', selectedImage.file);
                    }}
                  />
                </div>
                <div className={styles.wrap}>
                  <Field
                    autoComplete="off"
                    className={styles.input}
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                  />
                  {errors.name && <FormError name="name" />}
                </div>
                <div className={styles.wrap}>
                  <Field
                    autoComplete="off"
                    className={styles.input}
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                  />
                  {errors.email && <FormError name="email" />}
                </div>
                <div className={styles.wrap}>
                  <Field
                    autoComplete="off"
                    className={styles.input}
                    type={passwordShown ? 'text' : 'password'}
                    name="password"
                    placeholder="Change password"
                  />
                  <span className={styles.eye_icon} onClick={togglPassword}>
                    {passwordIcon}
                  </span>
                  {errors.password && <FormError name="password" />}
                </div>
                <button className={styles.btn} type="submit">
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
