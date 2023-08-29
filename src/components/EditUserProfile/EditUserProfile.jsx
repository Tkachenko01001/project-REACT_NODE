import Avatar from 'components/Avatar/Avatar';
import { Previews } from 'components/AvatarModal/AvatarModal';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from 'redux/auth/operations';
import { selectTheme, selectUser } from 'redux/auth/selectors';
import { object, string } from 'yup';
import { EyeClose } from '../AuthForm/EyeClose/EyeClose';
import { EyeOpen } from '../AuthForm/EyeOpen/EyeOpen';
import { Loader } from '../Loader/Loader';
import Modal from '../Modal/Modal';
import styles from './EditUserProfile.module.css';

const updateUserSchema = object({
  name: string()
    .required('the field cannot be empty')
    .min(2, 'minimum 2 characters')
    .max(32, 'maximum 32 characters')
    .test(
      'only-allowed-chars',
      'Must contain: only Latin, numbers, special characters',
      value => !value || /^[a-zA-Z0-9\-!@#$%^&*()_+,.:;’“?/]+$/.test(value)
    )
    .matches(/^[a-zA-Z0-9 !@#$%^&*()_+,.:;’“?/-]+$/, 'Invalid name format'),
  email: string()
    .required('the field cannot be empty')
    .email()
    .matches(/^[a-zA-Z0-9]+@[a-zA-Z]+\.[a-zA-Z]{2,3}$/, 'Invalid email format'),
  password: string()
    .min(8, 'minimum 8 characters')
    .max(64, 'maximum 64 characters')
    .test(
      'no-spaces',
      'Invalid format: without spaces',
      value => !value || !/\s/.test(value)
    )
    .test(
      'only-allowed-chars',
      'Must contain: only Latin, numbers, special characters',
      value => !value || /^[a-zA-Z0-9\-!@#$%^&*()_+,.:;’“?/]+$/.test(value)
    )
    .matches(/^[a-zA-Z0-9\-!@#$%^&*()_+,.:;’“?/]+$/, 'Invalid password format'),
});

export const EditUserProfile = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const theme = useSelector(selectTheme);

  const initialValues = {
    avatar: null,
    name: user.name,
    email: user.email,
    password: '',
  };

  const [passwordShown, setPasswordShown] = useState(false);
  const [passwordIcon, setPasswordIcon] = useState(<EyeClose />);

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
    setPasswordIcon(!passwordShown ? <EyeOpen /> : <EyeClose />);
  };

  const FormError = ({ name }) => {
    return (
      <ErrorMessage
        name={name}
        render={message => (
          <p className={theme === 'violet' ? styles.errorViolet : styles.error}>
            {message}
          </p>
        )}
      />
    );
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    setSubmitting(true);
    let formData = new FormData();
    formData.set('name', values.name);
    formData.set('email', values.email);
    if (values.avatar) formData.set('avatar', values.avatar);
    if (values.password) formData.set('password', values.password);
    try {
      await dispatch(updateUser(formData));
      resetForm();
      setIsModalOpen(false);
    } catch (error) {
    } finally {
      setSubmitting(false);
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => setIsModalOpen(state => !state);

  return (
    <div>
      <Avatar size={32} onClick={toggleModal} />
      {isModalOpen && (
        <Modal onClose={toggleModal}>
          <Formik
            autoComplete="off"
            initialValues={initialValues}
            validationSchema={updateUserSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, values, setFieldValue }) => (
              <Form className={styles.form}>
                <div className={styles.wrap}>
                  <p className={styles.title}>Edit profile</p>
                  <Previews
                    onImageSelect={selectedImage => {
                      setFieldValue('avatar', selectedImage);
                    }}
                  />
                </div>
                <div className={styles.wrap}>
                  <Field
                    className={
                      theme === 'violet' ? styles.inputViolet : styles.input
                    }
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                  />
                  {errors.name && <FormError name="name" />}
                </div>
                <div className={styles.wrap}>
                  <Field
                    className={
                      theme === 'violet' ? styles.inputViolet : styles.input
                    }
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                  />
                  {errors.email && <FormError name="email" />}
                </div>
                <div className={styles.wrap}>
                  <Field
                    className={
                      theme === 'violet' ? styles.inputViolet : styles.input
                    }
                    type={passwordShown ? 'text' : 'password'}
                    name="password"
                    placeholder="Change password"
                  />
                  <span className={styles.eye_icon} onClick={togglePassword}>
                    {passwordIcon}
                  </span>
                  {errors.password && <FormError name="password" />}
                </div>
                <button
                  className={theme === 'violet' ? styles.btnViolet : styles.btn}
                  type="submit"
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
