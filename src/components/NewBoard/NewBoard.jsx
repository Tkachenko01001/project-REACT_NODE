import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addBoard } from 'redux/boards/operations';
import sprite from '../../images/sprite.svg';
import Modal from '../Modal/Modal';
import styles from './NewBoard.module.css';

import { backgrounds } from 'constants/backgrounds';
import { icons } from 'constants/icons';

const NewBoard = ({ toggleModal }) => {
  const [icon, setIcon] = useState('icon-project');
  const [background, setBackground] = useState(null);  

  const dispatch = useDispatch();

  const handleSubmit = event => {
    event.preventDefault();
    dispatch(
      addBoard({
        title: event.target[0].value,
        icon,
        background,
      })
    );
    toggleModal();
  };
  const changeIcon = event => {
    setIcon(event.target.value);
  };
  const changeBg = event => {
    setBackground(event.target.value);
  };

  return (
        <Modal onClose={toggleModal}>
          <form onSubmit={handleSubmit}>
            <h1 className={styles.title}>New Board</h1>

            <input
              className={styles.field}
              id="title"
              type="text"
              name="title"
              placeholder="Title"
              required
            />
            <div className={styles.label} id="group-label-icon">
              Icons
              <fieldset
                className={styles.priority}
                role="group"
                aria-labelledby="group-label-icon"
              >
                {icons.map(iconItem => (
                  <>
                    <input
                      key={iconItem.value}
                      className={styles.input_svg}
                      id={iconItem.value}
                      type="radio"
                      name="icon"
                      value={iconItem.value}
                      checked={icon === `${iconItem.value}` ? true : false}
                      onChange={changeIcon}
                    />
                    <label
                      className={styles.label_svg}
                      htmlFor={iconItem.value}
                    >
                      <svg className={styles.svg} width="18" height="18">
                        <use href={sprite + `#${iconItem.value}`}></use>
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
                  </>
                ))}
              </fieldset>
            </div>

            <button className={styles.btn} type="submit">
              <svg className={styles.icon} width="28" height="28">
                <use href={sprite + '#icon-plus'}></use>
              </svg>
              Create
            </button>
          </form>
        </Modal>
       );
};

export default NewBoard;
