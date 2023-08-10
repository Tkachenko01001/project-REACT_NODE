import React, { useState } from 'react';
import Modal from '../Modal/Modal';
import sprite from '../../images/sprite.svg';
// import bgk from '../../images/bg1x.jpg';
import styles from './NewBoard.module.css';
import css from '../Sidebar/Sidebar.module.css';

const NewBoard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => setIsModalOpen(state => !state);
  const [value, setValue] = useState('icon-project');

  const backgrounds = Array.from(
    { length: 15 },
    (_, i) => `backgrounds/image${i + 1}.jpg`
  );
  const [currentBackground, setCurrentBackground] = useState(backgrounds[0]);

  const handleSubmit = (event, { resetForm }) => {
    event.preventDefault();
    resetForm();
  };

  const changeValue = event => {
    setValue(event.target.value);
  };

  const onClickBg = background => {
    setCurrentBackground(background);
  };

  return (
    <div>
      <button
        onClick={toggleModal}
        className={css.sidebarBoardButton}
        type="button"
      >
        <svg className={css.sidebarBoardIcon}>
          <use href={sprite + '#icon-plus'}></use>
        </svg>
      </button>
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
              <div
                className={styles.bg_priority}
                role="group"
                aria-labelledby="group-label-image"
              >
                <svg className={styles.svg} width="28" height="28">
                  <use href={sprite + '#icon-image-05'}></use>
                </svg>
                {backgrounds.map((background, index) => (
                  <label
                    key={index}
                    className="priority"
                    style={{ backgroundImage: `url(${background})` }}
                    onClick={() => onClickBg(background)}
                    htmlFor={`background_${index}`}
                  >
                    <input
                      type="radio"
                      name="radio"
                      value="background"
                      id={`background_${index}`}
                      onClick={() => onClickBg(background)}
                    />
                  </label>
                ))}
              </div>
              <div
                className="main-content"
                style={{
                  backgroundImage: `url(${currentBackground})`,
                }}
              ></div>
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

export default NewBoard;
