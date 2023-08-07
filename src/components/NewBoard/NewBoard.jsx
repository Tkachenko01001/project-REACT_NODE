import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import newBoards from '';
import sprite from '../../images/sprite.svg';
// import styles from './NewBoard.module.css';

const NewBoard = ({ onClose }) => {
  const [value, setValue] = useState('icon-project');
  //   const [background, setBackground] = useState('');
  //   const dispatch = useDispatch();

  const handleSubmit = event => {
    event.preventDefault();

    // const task = {
    //   title: event.currentTarget.elements.title.value,
    //   icon: value,
    //   background: background,
    // };

    // dispatch(newBoards(task));
    onClose();
  };

  const changeValue = event => {
    setValue(event.target.value);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>New Board</h1>
        <input
          id="title"
          type="text"
          name="title"
          placeholder="Title"
          required
        />
        <div id="group-label-icon">
          <h2>Icons</h2>
          <fieldset role="group" aria-labelledby="group-label-icon">
            <input
              id="project"
              type="radio"
              name="radio"
              value="icon-project"
              checked={value === 'icon-project' ? true : false}
              onChange={changeValue}
            />
            <label htmlFor="project">
              <svg width="18" height="18">
                <use href={sprite + '#icon-project'}></use>
              </svg>
            </label>

            <input
              id="star"
              type="radio"
              name="radio"
              value="icon-star"
              checked={value === 'icon-star' ? true : false}
              onChange={changeValue}
            />
            <label htmlFor="star">
              <svg width="18" height="18">
                <use href={sprite + '#icon-star'}></use>
              </svg>
            </label>

            <input
              id="loading"
              type="radio"
              name="radio"
              value="icon-loading"
              checked={value === 'icon-loading' ? true : false}
              onChange={changeValue}
            />
            <label htmlFor="loading">
              <svg width="18" height="18">
                <use href={sprite + '#icon-loading'}></use>
              </svg>
            </label>

            <input
              id="puzzle"
              type="radio"
              name="radio"
              value="icon-puzzle-piece"
              checked={value === 'icon-puzzle-piece' ? true : false}
              onChange={changeValue}
            />
            <label htmlFor="puzzle">
              <svg width="18" height="18">
                <use href={sprite + '#icon-puzzle-piece'}></use>
              </svg>
            </label>

            <input
              id="container"
              type="radio"
              name="radio"
              value="icon-container"
              checked={value === 'icon-container' ? true : false}
              onChange={changeValue}
            />
            <label htmlFor="container">
              <svg width="18" height="18">
                <use href={sprite + '#icon-container'}></use>
              </svg>
            </label>

            <input
              id="lightning"
              type="radio"
              name="radio"
              value="icon-lightning"
              checked={value === 'icon-lightning' ? true : false}
              onChange={changeValue}
            />
            <label htmlFor="lightning">
              <svg width="18" height="18">
                <use href={sprite + '#icon-lightning'}></use>
              </svg>
            </label>

            <input
              id="colors"
              type="radio"
              name="radio"
              value="icon-colors"
              checked={value === 'icon-colors' ? true : false}
              onChange={changeValue}
            />
            <label htmlFor="colors">
              <svg width="18" height="18">
                <use href={sprite + '#icon-colors'}></use>
              </svg>
            </label>

            <input
              id="hexagon"
              type="radio"
              name="radio"
              value="icon-hexagon"
              checked={value === 'icon-hexagon' ? true : false}
              onChange={changeValue}
            />
            <label htmlFor="hexagon">
              <svg width="18" height="18">
                <use href={sprite + '#icon-hexagon'}></use>
              </svg>
            </label>
          </fieldset>
        </div>

        <div id="group-label-image">
          <fieldset role="group" aria-labelledby="group-label-image">
            <h2>Background</h2>
            <label>{}</label>
          </fieldset>
        </div>

        <button type="submit">
          <svg width="28" height="28">
            <use href={sprite + '#icon-plus'}></use>
          </svg>
          Edit
        </button>
        {/* <button>
          <svg width="18" height="18">
            <use href={sprite + '#icon-x-close'}></use>
          </svg>
        </button> */}
      </form>
    </div>
  );
};

export default NewBoard;
