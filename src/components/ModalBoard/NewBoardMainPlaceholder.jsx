import { backgrounds } from 'constants/backgrounds';
import { icons } from 'constants/icons';
import { Field, Form, Formik } from 'formik';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ClipLoader from 'react-spinners/ClipLoader';
import { selectTheme } from 'redux/auth/selectors';
import { addBoard } from 'redux/boards/operations';
import { selectIsBoardsLoading } from 'redux/boards/selectors';
import { modalSchema } from 'schemas/modalSchema';
import sprite from '../../images/sprite.svg';
import style from '../AuthForm/LogInForm/LoginForm.module.css';
import ModalPortal from '../Modal/ModalPortal';
import styles from './ModalBoard.module.css';

const NewBoardMainPlaceholder = ({ setIsModalOpen }) => {
  const isBoardsLoading = useSelector(selectIsBoardsLoading);
  const toggleModal = () => setIsModalOpen(state => !state);
  const [title, setTitle] = useState('');
  const [icon, setIcon] = useState('icon-project');
  const [background, setBackground] = useState('default');
  const theme = useSelector(selectTheme);

  const dispatch = useDispatch();

  const handleSubmit = (_, { setSubmitting }) => {
    dispatch(
      addBoard({
        title,
        icon,
        background: background || 'default',
      })
    ).then(() => {
      if (!isBoardsLoading) {
        toggleModal();
        setTitle('');
        setIcon('icon-project');
        setBackground('default');
        setSubmitting(false);
      }
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
    <ModalPortal onClose={toggleModal}>
      <Formik
        initialValues={{ title: '' }}
        validationSchema={modalSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, setFieldValue }) => (
          <Form autoComplete="off">
            <h2 className={styles.title}>New board</h2>
            <div className={style.wrap}>
              <Field
                className={
                  theme === 'violet' ? styles.fieldViolet : styles.field
                }
                id="title"
                type="text"
                name="title"
                placeholder={title}
                value={title}
                autoComplete="off"
                autoFocus
                onChange={e => handleChange(e, setFieldValue)}
              />
              {errors.title && (
                <p
                  className={
                    theme === 'violet' ? styles.errorViolet : styles.error
                  }
                >
                  {errors.title}
                </p>
              )}
            </div>
            <div className={styles.label} id="group-label-icon">
              Icons
              <fieldset
                className={styles.priority}
                role="group"
                aria-labelledby="group-label-icon"
              >
                {icons.map(iconItem => (
                  <div key={iconItem.value}>
                    <Field
                      className={styles.input_svg}
                      id={iconItem.value}
                      type="radio"
                      name={iconItem.value}
                      value={iconItem.value}
                      checked={icon === iconItem.value}
                      onChange={() => setIcon(iconItem.value)}
                    />
                    <label
                      className={styles.label_svg}
                      htmlFor={iconItem.value}
                      onClick={() => setIcon(iconItem.value)}
                    >
                      <svg className={styles.svg} width="18" height="18">
                        <use href={`${sprite}#${iconItem.value}`} />
                      </svg>
                    </label>
                  </div>
                ))}
              </fieldset>
            </div>
            <div className={styles.label} id="group-label-image">
              Background
              <fieldset
                className={styles.bg_priority}
                role="group"
                aria-labelledby="group-label-image"
              >
                {backgrounds.map(bg => (
                  <div key={bg.title}>
                    <Field
                      className={styles.input_png}
                      id={bg.title}
                      type="radio"
                      name={bg.title}
                      value={bg.title}
                      checked={background === bg.title}
                      onChange={() => setBackground(bg.title)}
                    />
                    <label
                      className={styles.label_png}
                      htmlFor={bg.title}
                      onClick={() => setBackground(bg.title)}
                    >
                      <img
                        className={styles.png}
                        alt={bg.title}
                        src={bg.src}
                        width="28"
                        height="28"
                      />
                    </label>
                  </div>
                ))}
              </fieldset>
            </div>
            <button
              className={theme === 'violet' ? styles.btnViolet : styles.btn}
              type="submit"
            >
              {isBoardsLoading ? (
                <ClipLoader color="#1f1f1f" size={30} />
              ) : (
                <svg
                  className={
                    theme === 'violet' ? styles.iconViolet : styles.icon
                  }
                  width="28"
                  height="28"
                >
                  <use href={`${sprite}#icon-plus`} />
                </svg>
              )}
              Create
            </button>
          </Form>
        )}
      </Formik>
    </ModalPortal>
  );
};

export default NewBoardMainPlaceholder;
