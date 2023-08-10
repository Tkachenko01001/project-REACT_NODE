import React, { useState } from 'react';
import Modal from '../Modal/Modal';
import sprite from '../../images/sprite.svg';
import styles from './NewBoard.module.css';
import css from '../Sidebar/Sidebar.module.css';
import { addBoard } from 'redux/boards/operations';
import { useDispatch } from 'react-redux';
import defaultImgMob from '../../images/defaultImg-mobile-1x.png';
import airBallonMob from '../../images/airBalloon-mobile-1x.jpg';
import blueMob from '../../images/blue-mobile-1x.jpg';
import cappadociaMob from '../../images/cappadocia-mobile-1x.jpg';
import flowersMob from '../../images/flowers-mobile-1x.jpg';
import gorgeMob from '../../images/gorge-mobile-1x.jpg';
import greensMob from '../../images/greens-mobile-1x.jpg';
import moonMob from '../../images/moon-mobile-1x.jpg';
import mountainsMob from '../../images/mountains-mobile-1x.jpg';
import rocksAndSeaMob from '../../images/rocksAndSea-mobile-1x.jpg';
import seaMob from '../../images/sea-mobile-1x.jpg';
import semiMoonMob from '../../images/semiMoon-mobile-1x.jpg';
import trailerMob from '../../images/trailer-mobile-1x.jpg';
import treeMob from '../../images/tree-mobile-1x.jpg';
import violetSphereMob from '../../images/violetSphere-mobile-1x.jpg';
import yachtMob from '../../images/yacht-mobile-1x.jpg';

const NewBoard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => setIsModalOpen(state => !state);
  const [value, setValue] = useState('icon-project');

  const dispatch = useDispatch();

  const handleSubmit = (event, { resetForm }) => {
    event.preventDefault();
    console.log(event.target.value);
    dispatch(
      addBoard({
        title: event.target[0].value,
        icon: event.target.value,
      })
    );
    resetForm();
  };

  const changeValue = event => {
    setValue(event.target.value);
  };

  // const onClickBg = background => {
  //   setCurrentBackground(background);
  // };

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
              <fieldset
                className={styles.bg_priority}
                role="group"
                aria-labelledby="group-label-icon"
              >
                {/* <input
                  className={styles.input_svg}
                  id="image-05"
                  type="radio"
                  name="radio"
                  value="image-05"
                  checked={value === 'image-05' ? true : false}
                  onChange={changeValue}
                />
                <label className={styles.label_svg} htmlFor="image-05">
                  <svg className={styles.svg} width="18" height="18">
                    <use href={sprite + '#icon-image-05'}></use>
                  </svg>
                </label> */}
                {/* <ul className={styles.img_bg}> */}
                {/* <li className={styles.item}> */}
                <img
                  className={styles.img}
                  src={`${defaultImgMob}`}
                  alt=""
                  width="28"
                  height="28"
                />
                <img
                  className={styles.img}
                  src={`${airBallonMob}`}
                  alt=""
                  width="28"
                  height="28"
                />
                {/* </li> */}
                {/* <li className={styles.item}> */}
                <img
                  className={styles.img}
                  src={`${blueMob}`}
                  alt=""
                  width="28"
                  height="28"
                />
                {/* </li> */}
                {/* <li className={styles.item}> */}
                <img
                  className={styles.img}
                  src={`${cappadociaMob}`}
                  alt=""
                  width="28"
                  height="28"
                />
                {/* </li> */}
                {/* <li className={styles.item}> */}
                <img
                  className={styles.img}
                  src={`${flowersMob}`}
                  alt=""
                  width="28"
                  height="28"
                />
                {/* </li> */}
                {/* <li className={styles.item}> */}
                <img
                  className={styles.img}
                  src={`${gorgeMob}`}
                  alt=""
                  width="28"
                  height="28"
                />
                {/* </li> */}
                {/* <li className={styles.item}> */}
                <img
                  className={styles.img}
                  src={`${greensMob}`}
                  alt=""
                  width="28"
                  height="28"
                />
                {/* </li> */}
                {/* <li className={styles.item}> */}
                <img
                  className={styles.img}
                  src={`${moonMob}`}
                  alt=""
                  width="28"
                  height="28"
                />
                {/* </li> */}
                {/* <li className={styles.item}> */}
                <img
                  className={styles.img}
                  src={`${mountainsMob}`}
                  alt=""
                  width="28"
                  height="28"
                />
                {/* </li> */}
                {/* <li className={styles.item}> */}
                <img
                  className={styles.img}
                  src={`${rocksAndSeaMob}`}
                  alt=""
                  width="28"
                  height="28"
                />
                {/* </li> */}
                {/* <li className={styles.item}> */}
                <img
                  className={styles.img}
                  src={`${seaMob}`}
                  alt=""
                  width="28"
                  height="28"
                />
                {/* </li> */}
                {/* <li className={styles.item}> */}
                <img
                  className={styles.img}
                  src={`${semiMoonMob}`}
                  alt=""
                  width="28"
                  height="28"
                />
                {/* </li> */}
                {/* <li className={styles.item}> */}
                <img
                  className={styles.img}
                  src={`${trailerMob}`}
                  alt=""
                  width="28"
                  height="28"
                />
                {/* </li> */}
                {/* <li className={styles.item}> */}
                <img
                  className={styles.img}
                  src={`${treeMob}`}
                  alt=""
                  width="28"
                  height="28"
                />
                {/* </li> */}
                {/* <li className={styles.item}> */}
                <img
                  className={styles.img}
                  src={`${violetSphereMob}`}
                  alt=""
                  width="28"
                  height="28"
                />
                {/* </li> */}
                {/* <li className={styles.item}> */}
                <img
                  className={styles.img}
                  src={`${yachtMob}`}
                  alt=""
                  width="28"
                  height="28"
                />
                {/* </li> */}
                {/* </ul> */}
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

export default NewBoard;
