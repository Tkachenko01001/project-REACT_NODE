import { backgrounds } from 'constants/backgrounds';
import { icons } from 'constants/icons';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ClipLoader from 'react-spinners/ClipLoader';
import { updateBoard } from 'redux/boards/operations';
import { selectIsBoardsLoading } from 'redux/boards/selectors';
import sprite from '../../images/sprite.svg';
import ModalPortal from '../Modal/ModalPortal';
import css from '../Sidebar/Sidebar.module.css';
import styles from './ModalBoard.module.css';
import { selectTheme } from 'redux/auth/selectors';

const EditBoard = ({ board, checked }) => {
  const theme = useSelector(selectTheme);
  const isBoardsLoading = useSelector(selectIsBoardsLoading);

  const { _id: id, title, icon, background } = board;
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => setIsModalOpen(state => !state);
  const [newTitle, setNewTitle] = useState(title);
  const [newIcon, setNewIcon] = useState(icon);
  const [newBackground, setNewBackground] = useState(background);

  useEffect(() => {
    setNewBackground(background);
    setNewIcon(icon);
  }, [background, icon]);

  const handleSubmit = event => {
    event.preventDefault();
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
      !isBoardsLoading && toggleModal();
      setNewIcon(icon);
      setNewBackground(background);
    });
  };

  const changeIcon = newValue => {
    setNewIcon(newValue);
  };
  const changeBg = newValue => {
    setNewBackground(newValue);
  };
  const changeTitle = event => {
    setNewTitle(event.target.value);
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
          <form onSubmit={handleSubmit}>
            <h1 className={styles.title}>Edit Board</h1>

            <input
              className={theme === 'violet' ? styles.fieldViolet : styles.field}
              id="title"
              type="text"
              name="title"
              placeholder={title}
              value={newTitle}
              onChange={changeTitle}
            />
            <div className={styles.label} id="group-label-icon">
              Icons
              <fieldset
                className={styles.priority}
                role="group"
                aria-labelledby="group-label-icon"
              >
                {icons.map(iconItem => (
                  <div key={iconItem.value}>
                    <input
                      className={styles.input_svg}
                      id={iconItem.value}
                      type="radio"
                      name={`iconNew-${id}`}
                      value={iconItem.value}
                      checked={newIcon === iconItem.value}
                      onChange={() => changeIcon(iconItem.value)}
                    />
                    <label
                      className={styles.label_svg}
                      htmlFor={iconItem.value}
                      onClick={() => changeIcon(iconItem.value)}
                    >
                      <svg className={styles.svg} width="18" height="18">
                        <use href={sprite + `#${iconItem.value}`}></use>
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
                    <input
                      className={styles.input_png}
                      id={bg.title}
                      type="radio"
                      name={`bgNew-${id}`}
                      value={bg.title}
                      checked={newBackground === bg.title}
                      onChange={() => changeBg(bg.title)}
                    />
                    <label
                      className={styles.label_png}
                      htmlFor={bg.title}
                      onClick={() => changeBg(bg.title)}
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
                  <use href={sprite + '#icon-plus'}></use>
                </svg>
              )}
              Edit
            </button>
          </form>
        </ModalPortal>
      )}
    </div>
  );
};
export default EditBoard;
