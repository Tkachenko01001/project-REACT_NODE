import axios from 'axios';
import ModalPortal from 'components/Modal/ModalPortal';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ClipLoader from 'react-spinners/ClipLoader';
import { selectIsLoading, selectTheme } from 'redux/auth/selectors';
import { needHelpSchema } from 'schemas/needHelpShema';
import style from '../EditTaskCard/EditTaskCard.module.css';
import css from '../NeedHelp/NeedHelp.module.css';
import styles from './Help.module.css';
import { ModalMessage } from './ModalMessage';

axios.defaults.baseURL = 'https://project-react-node-back.onrender.com';

const initialValues = {
  email: '',
  comment: '',
};

export const HelpForm = () => {
  const isLoading = useSelector(selectIsLoading);
  const [isFormEmpty, setIsFormEmpty] = useState(true);
  const [response, setResponse] = useState('');
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalMessageOpen, setIsModalMessageOpen] = useState(false);
  const theme = useSelector(selectTheme);

  const toggleModal = () => setIsModalOpen(state => !state);

  const handleChange = ({ target: { name, value } }, setFieldValue) => {
    setFieldValue(name, value);
    switch (name) {
      case 'email':
        setEmail(value);
        break;
      case 'comment':
        setComment(value);
        break;
      default:
        break;
    }
    const isEmailEmpty =
      name === 'email' ? value.trim() === '' : email.trim() === '';
    const isCommentEmpty =
      name === 'comment' ? value.trim() === '' : comment.trim() === '';
    setIsFormEmpty(isEmailEmpty || isCommentEmpty);
  };

  const reset = () => {
    setEmail('');
    setComment('');
    setIsFormEmpty(true);
  };

  useEffect(() => {
    if (isModalMessageOpen) {
      setIsModalMessageOpen(true);
    }
  }, [isModalMessageOpen, isFormEmpty]);

  const handleSubmit = async () => {
    try {
      const res = await axios.post('/api/users/help', { email, comment });
      setIsModalMessageOpen(true);
      reset();
      setResponse(res.data.message);
      return res.data.message;
    } catch (error) {
      setIsModalMessageOpen(true);
      setResponse(error.message);
    }
  };

  const FormError = ({ name }) => {
    return (
      <ErrorMessage
        name={name}
        render={message => (
          <p className={theme === 'violet' ? style.errorViolet : style.error}>
            {message}
          </p>
        )}
      />
    );
  };

  return (
    <>
      <p className={css.sidebarHelpBoxItem}>
        If you need help with
        <button
          onClick={toggleModal}
          className={
            theme === 'violet'
              ? css.sidebarHelpBoxLinkViolet
              : css.sidebarHelpBoxLinkGreen
          }
          type="button"
          aria-label="Open Help Modal for TaskPro"
        >
          TaskPro
        </button>
        , check out our support resources or reach out to our customer support
        team.
      </p>
      {isModalOpen && (
        <ModalPortal onClose={toggleModal}>
          <Formik
            initialValues={initialValues}
            validationSchema={needHelpSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, setFieldValue }) => (
              <Form autoComplete="off">
                <h2 className={styles.title}>Need help</h2>
                <div className={style.wrapError}>
                  <Field
                    className={
                      theme === 'violet' ? style.inputViolet : style.input
                    }
                    type="email"
                    name="email"
                    placeholder="Email address"
                    value={email}
                    onChange={e => handleChange(e, setFieldValue)}
                  />
                  {errors.email && <FormError name="email" />}
                </div>
                <div className={style.wrapError}>
                  <Field
                    as="textarea"
                    className={
                      theme === 'violet' ? style.textareaViolet : style.textarea
                    }
                    type="text"
                    name="comment"
                    placeholder="Comment"
                    value={comment}
                    onChange={e => handleChange(e, setFieldValue)}
                  />
                  {errors.comment && <FormError name="comment" />}
                </div>
                <button
                  className={theme === 'violet' ? styles.btnViolet : styles.btn}
                  type="submit"
                  onClick={handleSubmit}
                  disabled={isFormEmpty}
                >
                  {isLoading && <ClipLoader color="#1f1f1f" size={30} />}
                  Send
                </button>
              </Form>
            )}
          </Formik>

          {isModalMessageOpen && (
            <ModalMessage
              toggleModal={() => setIsModalMessageOpen(false)}
              title={
                response === 'Your comment has been sent'
                  ? 'Successful response'
                  : 'Network error'
              }
              message={response}
            />
          )}
        </ModalPortal>
      )}
    </>
  );
};
