import { backgrounds } from 'constants/backgrounds';
import { icons } from 'constants/icons';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ClipLoader from 'react-spinners/ClipLoader';
import { selectTheme } from 'redux/auth/selectors';
import { addBoard } from 'redux/boards/operations';
import { selectIsBoardsLoading } from 'redux/boards/selectors';
import sprite from '../../images/sprite.svg';
import ModalPortal from '../Modal/ModalPortal';
import css from '../Sidebar/Sidebar.module.css';
import styles from './ModalBoard.module.css';

const NewBoard = () => {
  const isBoardsLoading = useSelector(selectIsBoardsLoading);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => setIsModalOpen(state => !state);
  const [title, setTitle] = useState('');
  const [icon, setIcon] = useState('icon-project');
  const [background, setBackground] = useState('default');
  const theme = useSelector(selectTheme);

  const dispatch = useDispatch();

  const handleSubmit = event => {
    event.preventDefault();
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
      }
    });
  };

  const changeIcon = newValue => {
    setIcon(newValue);
  };
  const changeBg = newValue => {
    setBackground(newValue);
  };
  const changeTitle = event => {
    setTitle(event.target.value);
  };

  return (
    <div>
      <button
        onClick={toggleModal}
        className={css.sidebarBoardButton}
        type="button"
      >
        <svg
          className={
            theme === 'violet'
              ? css.sidebarBoardIconViolet
              : css.sidebarBoardIconGreen
          }
          width={36}
          height={36}
        >
          <use href={sprite + '#icon-plus'}></use>
        </svg>
      </button>
      {isModalOpen && (
        <ModalPortal onClose={toggleModal}>
          <form onSubmit={handleSubmit}>
            <h1 className={styles.title}>New board</h1>

            <input
              className={theme === 'violet' ? styles.fieldViolet : styles.field}
              id="title"
              type="text"
              name="title"
              placeholder={title}
              value={title}
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
                      name={iconItem.value}
                      value={iconItem.value}
                      checked={icon === iconItem.value}
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
                      name={bg.title}
                      value={bg.title}
                      checked={background === bg.title}
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
              Create
            </button>
          </form>
        </ModalPortal>
      )}
    </div>
  );
};
export default NewBoard;
