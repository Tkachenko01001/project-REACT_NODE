import { useState } from 'react';
import sprite from '../../../images/sprite.svg';
import Modal from '../../Modal/Modal';
import styles from '../../ModalBoard/ModalBoard.module.css';

const MainButtonNewBoard = ({ isModalOpen, toggleModal }) => {
  const [value, setValue] = useState('icon-project');

  const handleSubmit = event => {
    event.preventDefault();
  };

  const changeValue = event => {
    setValue(event.target.value);
  };

  return (
    <div>
      {isModalOpen && (
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
                <input
                  className={styles.input_svg}
                  id="project"
                  type="radio"
                  name="radio"
                  value="icon-project"
                  checked={value === 'icon-project' ? true : false}
                  onChange={changeValue}
                />
                <label className={styles.label_svg} htmlFor="project">
                  <svg className={styles.svg} width="18" height="18">
                    <use href={sprite + '#icon-project'}></use>
                  </svg>
                </label>

                <input
                  className={styles.input_svg}
                  id="star"
                  type="radio"
                  name="radio"
                  value="icon-star"
                  checked={value === 'icon-star' ? true : false}
                  onChange={changeValue}
                />
                <label className={styles.label_svg} htmlFor="star">
                  <svg className={styles.svg} width="18" height="18">
                    <use href={sprite + '#icon-star'}></use>
                  </svg>
                </label>

                <input
                  className={styles.input_svg}
                  id="loading"
                  type="radio"
                  name="radio"
                  value="icon-loading"
                  checked={value === 'icon-loading' ? true : false}
                  onChange={changeValue}
                />
                <label className={styles.label_svg} htmlFor="loading">
                  <svg className={styles.svg} width="18" height="18">
                    <use href={sprite + '#icon-loading'}></use>
                  </svg>
                </label>

                <input
                  className={styles.input_svg}
                  id="puzzle"
                  type="radio"
                  name="radio"
                  value="icon-puzzle-piece"
                  checked={value === 'icon-puzzle-piece' ? true : false}
                  onChange={changeValue}
                />
                <label className={styles.label_svg} htmlFor="puzzle">
                  <svg className={styles.svg} width="18" height="18">
                    <use href={sprite + '#icon-puzzle-piece'}></use>
                  </svg>
                </label>

                <input
                  className={styles.input_svg}
                  id="container"
                  type="radio"
                  name="radio"
                  value="icon-container"
                  checked={value === 'icon-container' ? true : false}
                  onChange={changeValue}
                />
                <label className={styles.label_svg} htmlFor="container">
                  <svg className={styles.svg} width="18" height="18">
                    <use href={sprite + '#icon-container'}></use>
                  </svg>
                </label>

                <input
                  className={styles.input_svg}
                  id="lightning"
                  type="radio"
                  name="radio"
                  value="icon-lightning"
                  checked={value === 'icon-lightning' ? true : false}
                  onChange={changeValue}
                />
                <label className={styles.label_svg} htmlFor="lightning">
                  <svg className={styles.svg} width="18" height="18">
                    <use href={sprite + '#icon-lightning'}></use>
                  </svg>
                </label>

                <input
                  className={styles.input_svg}
                  id="colors"
                  type="radio"
                  name="radio"
                  value="icon-colors"
                  checked={value === 'icon-colors' ? true : false}
                  onChange={changeValue}
                />
                <label className={styles.label_svg} htmlFor="colors">
                  <svg className={styles.svg} width="18" height="18">
                    <use href={sprite + '#icon-colors'}></use>
                  </svg>
                </label>

                <input
                  className={styles.input_svg}
                  id="hexagon"
                  type="radio"
                  name="radio"
                  value="icon-hexagon"
                  checked={value === 'icon-hexagon' ? true : false}
                  onChange={changeValue}
                />
                <label className={styles.label_svg} htmlFor="hexagon">
                  <svg className={styles.svg} width="18" height="18">
                    <use href={sprite + '#icon-hexagon'}></use>
                  </svg>
                </label>
              </fieldset>
            </div>

            <div className={styles.label} id="group-label-image">
              Background
              <fieldset
                className={styles.bg_priority}
                role="group"
                aria-labelledby="group-label-image"
              >
                <label htmlFor="block">
                  <input type="radio" name="radio" value="" />
                  <svg className={styles.svg} width="28" height="28">
                    <use></use>
                  </svg>
                </label>
                {/* {'backgrounds'.map(bg => {
            return (
              <>
                <item key={bg._id} bg={bg} _id={bg._id} />
              </>
            );
          })} */}
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
      )}
    </div>
  );
};

export default MainButtonNewBoard;
