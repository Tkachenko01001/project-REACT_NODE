import { backgrounds } from 'constants/backgrounds';
import { icons } from 'constants/icons';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateBoard } from 'redux/boards/operations';

import sprite from '../../images/sprite.svg';
import Modal from '../Modal/Modal';
import css from '../Sidebar/Sidebar.module.css';
import styles from './EditBoard.module.css';

const EditBoard = ({ id, title, icon, background }) => {
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
    );
    toggleModal();
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
        <Modal onClose={toggleModal}>
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
                {icons.map(icon => (
                  <>
                    <input
                      key={icon.value}
                      className={styles.input_svg}
                      id={icon.value}
                      type="radio"
                      name="icon"
                      value={icon.value}
                      checked={newIcon === icon.value ? true : false}
                      onChange={changeIcon}
                    />
                    <label className={styles.label_svg} htmlFor={icon.value}>
                      <svg className={styles.svg} width="18" height="18">
                        <use href={sprite + `#${icon.value}`}></use>
                      </svg>
                    </label>
                  </>
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
                  <>
                    <input
                      key={bg.title}
                      className={styles.input_png}
                      id={bg.title}
                      type="radio"
                      name="bg"
                      value={bg.title}
                      checked={newBackground === bg.title ? true : false}
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
                  </>
                ))}
              </fieldset>
            </div>

            <button className={styles.btn} type="submit">
              <svg className={styles.icon} width="28" height="28">
                <use href={sprite + '#icon-plus'}></use>
              </svg>
              Edit
            </button>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default EditBoard;
