import Button from 'components/Button/Button';
import { Field, Form, Formik } from 'formik';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectTheme } from 'redux/auth/selectors';
import { addColumn } from 'redux/boards/operations';
import {
  selectActiveBoard,
  selectIsBoardsLoading,
} from 'redux/boards/selectors';
import { modalSchema } from 'schemas/modalSchema';
import style from '../../AuthForm/LogInForm/LoginForm.module.css';
import styles from './AddColumn.module.css';

export default function AddColumn({ toggleModal }) {
  const dispatch = useDispatch();
  const activeBoard = useSelector(selectActiveBoard);
  const isBoardsLoading = useSelector(selectIsBoardsLoading);
  const theme = useSelector(selectTheme);
  const [title, setTitle] = useState('');

  const handleSubmit = (_, { setSubmitting }) => {
    dispatch(
      addColumn({
        title: title,
        board: activeBoard._id,
      })
    ).then(() => {
      !isBoardsLoading && toggleModal();
      setSubmitting(false);
    });
  };

  const handleChange = ({ target: { name, value } }, setFieldValue) => {
    setFieldValue(name, value);
    switch (name) {
      case 'title':
        return setTitle(value);
      default:
        return;
    }
  };

  return (
    <>
      <Formik
        initialValues={{ title: title }}
        validationSchema={modalSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, setFieldValue }) => (
          <Form autoComplete="off">
            <h2 className={styles.title}>Add column</h2>
            <div className={style.wrap}>
              <Field
                className={
                  theme === 'violet' ? styles.inputViolet : styles.input
                }
                id="title"
                type="text"
                name="title"
                placeholder="Title"
                value={title}
                autoComplete="off"
                autoFocus
                onChange={e => handleChange(e, setFieldValue)}
              />
              {errors.title && (
                <p
                  className={
                    theme === 'violet' ? style.errorViolet : style.error
                  }
                >
                  {errors.title}
                </p>
              )}
            </div>
            <Button loading={isBoardsLoading} icon="true" text="Add" />
          </Form>
        )}
      </Formik>
    </>
  );
}
