import { backgrounds } from 'constants/backgrounds';
import { icons } from 'constants/icons';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ClipLoader from 'react-spinners/ClipLoader';
import { updateBoard } from 'redux/boards/operations';
import {
  selectActiveBoard,
  selectIsBoardsLoading,
} from 'redux/boards/selectors';
import sprite from '../../images/sprite.svg';
import css from '../Sidebar/Sidebar.module.css';
import styles from './ModalBoard.module.css';
import ModalPortal from './ModalPortal';
const EditBoard = ({ checked }) => {
  const isBoardsLoading = useSelector(selectIsBoardsLoading);
  const activeBoardItems = useSelector(selectActiveBoard);

  const { _id: id, title, icon, background } = activeBoardItems;
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => setIsModalOpen(state => !state);
  const [newTitle, setNewTitle] = useState(title);
  const [newIcon, setNewIcon] = useState(icon);
  const [newBackground, setNewBackground] = useState(background);

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
    });
  };

  const changeIcon = event => {
    setNewIcon(event.target.value);
  };
  const changeBg = event => {
    setNewBackground(event.target.value);
  };
  const changeTitle = event => {
    setNewTitle(event.target.value);
  };
  const iconActive = !checked
    ? css.sidebarNewBoardButton
    : css.sidebarNewBoardButtonActive;
  return (
    <div>
      <button className={iconActive} type="button" onClick={toggleModal}>
        <svg className={css.sidebarNewBoardIcon}>
          <use href={sprite + '#icon-pencil'} />
        </svg>
      </button>
      {isModalOpen && (
        <ModalPortal onClose={toggleModal}>
          <form onSubmit={handleSubmit}>
            <h1 className={styles.title}>Edit Board</h1>

            <input
              className={styles.field}
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
                      name="iconItem"
                      value={iconItem.value}
                      checked={icon === iconItem.value ? true : false}
                      onChange={changeIcon}
                      onClick={() => console.log('kjhfvaj')}
                    />
                    <label
                      className={styles.label_svg}
                      htmlFor={iconItem.value}
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
                      name="bg"
                      value={bg.title}
                      checked={background === bg.title ? true : false}
                      onChange={changeBg}
                    />
                    <label className={styles.label_png} htmlFor={bg.title}>
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

            <button className={styles.btn} type="submit" onClick={handleSubmit}>
              {isBoardsLoading ? (
                <ClipLoader color="#1f1f1f" size={30} />
              ) : (
                <svg className={styles.icon} width="28" height="28">
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
