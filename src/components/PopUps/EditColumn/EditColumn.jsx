import Button from 'components/Button/Button';
import { Field, Form, Formik } from 'formik';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectTheme } from 'redux/auth/selectors';
import { updateColumn } from 'redux/boards/operations';
import { selectIsBoardsLoading } from 'redux/boards/selectors';
import { modalSchema } from 'schemas/modalSchema';
import style from '../../AuthForm/LogInForm/LoginForm.module.css';
import styles from './EditColumn.module.css';

export default function EditColumn({ id, title, onClose }) {
  const isBoardsLoading = useSelector(selectIsBoardsLoading);
  const dispatch = useDispatch();
  const [newTitle, setNewTitle] = useState(title);
  const theme = useSelector(selectTheme);

  const handleSubmit = (_, { setSubmitting }) => {
    dispatch(updateColumn([id, { title: newTitle }])).then(() => {
      !isBoardsLoading && onClose();
      setSubmitting(false);
    });
  };

  const handleChange = ({ target: { name, value } }, setFieldValue) => {
    setFieldValue(name, value);
    switch (name) {
      case 'title':
        return setNewTitle(value);
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
            <h2 className={styles.title}>Edit column</h2>
            <div className={style.wrap}>
              <Field
                className={
                  theme === 'violet' ? styles.inputViolet : styles.input
                }
                id="title"
                type="text"
                name="title"
                placeholder="Title"
                value={newTitle}
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
