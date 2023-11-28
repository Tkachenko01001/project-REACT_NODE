import { backgrounds } from 'constants/backgrounds';
import { icons } from 'constants/icons';
import { Field, Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ClipLoader from 'react-spinners/ClipLoader';
import { selectTheme } from 'redux/auth/selectors';
import { updateBoard } from 'redux/boards/operations';
import { selectIsBoardsLoading } from 'redux/boards/selectors';
import { modalSchema } from 'schemas/modalSchema';
import sprite from '../../assets/svg/sprite.svg';
import style from '../AuthForm/LogInForm/LoginForm.module.css';
import ModalPortal from '../Modal/ModalPortal';
import css from '../Sidebar/Sidebar.module.css';
import styles from './ModalBoard.module.css';

const EditBoard = ({ board }) => {
  const theme = useSelector(selectTheme);
  const isBoardsLoading = useSelector(selectIsBoardsLoading);

  const { _id: id, title, icon, background } = board;
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => setIsModalOpen(state => !state);
  const [newTitle, setNewTitle] = useState(title);
  const [newIcon, setNewIcon] = useState(icon);
  const [newBackground, setNewBackground] = useState(background);

  if (newBackground === null) setNewBackground('default');

  useEffect(() => {
    setNewBackground(background);
    setNewIcon(icon);
  }, [background, icon]);

  const handleSubmit = () => {
    if (newBackground === 'default') setNewBackground(null);
    dispatch(
      updateBoard({
        id,
        data: {
          title: newTitle,
          icon: newIcon,
          background: newBackground,
        },
      })
    ).then(() => {
      if (!isBoardsLoading) toggleModal();
      setNewTitle(newTitle);
      setNewIcon(newIcon);
      setNewBackground(newBackground);
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
    <div>
      <button
        className={css.sidebarNewBoardButton}
        type="button"
        onClick={toggleModal}
      >
        <svg className={css.sidebarNewBoardIcon}>
          <use href={sprite + '#icon-pencil'} />
        </svg>
      </button>
      {isModalOpen && (
        <ModalPortal onClose={toggleModal}>
          <Formik
            initialValues={{ title: title }}
            validationSchema={modalSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, setFieldValue }) => (
              <Form autoComplete="off">
                <h2 className={styles.title}>Edit board</h2>
                <div className={style.wrap}>
                  <Field
                    className={
                      theme === 'violet' ? styles.fieldViolet : styles.field
                    }
                    id="title"
                    type="text"
                    name="title"
                    placeholder={title}
                    value={newTitle}
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
                          checked={newIcon === iconItem.value}
                          onChange={() => setNewIcon(iconItem.value)}
                        />
                        <label
                          className={styles.label_svg}
                          htmlFor={iconItem.value}
                          onClick={() => setNewIcon(iconItem.value)}
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
                          checked={newBackground === bg.title}
                          onChange={() => setNewBackground(bg.title)}
                        />
                        <label
                          className={styles.label_png}
                          htmlFor={bg.title}
                          onClick={() => setNewBackground(bg.title)}
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
                  onClick={handleSubmit}
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
                  Edit
                </button>
              </Form>
            )}
          </Formik>
        </ModalPortal>
      )}
    </div>
  );
};
export default EditBoard;
