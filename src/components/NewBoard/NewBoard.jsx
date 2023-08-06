// import Modal from '../Modal/Modal';
// import { useState } from 'react';
//...
// const [isModalOpen, setIsModalOpen] = useState(false);
// const toggleModal = () => setIsModalOpen(state => !state);
//...
// return (
//    <button onClick={toggleModal}>Відкрити модалку</button>
// {isModalOpen && (
// <Modal onClose={toggleModal}>
// {Сюди потрібно додати елемент з інпутами та кнопкою, і напевно передати якісь пропси - це буде у відкритій модалці}
// </Modal>)})
import React from 'react';
import sprite from '../../images/sprite.svg';
import styles from './NewBoard.module.css';

const NewBoard = ({}) => {
  return (
    <div>
      <h1>New Board</h1>
      <form>
        <label>Title</label>
        <input id="" type="" placeholder="Title" onChange={handleTitleChange} />
        <h2>Icons</h2>
        <svg>{}</svg>
        <h2>Background</h2>
        <label>{}</label>
        <button type="submit" onSubmit={handleSubmit}>
          <svg width="28" height="28">
            <use href={sprite + '#icon-plus'}></use>
          </svg>
          Edit
        </button>
        <button>
          <svg width="18" height="18">
            <use href={sprite + '#icon-x-close'}></use>
          </svg>
        </button>
      </form>
    </div>
  );
};

export default NewBoard;
