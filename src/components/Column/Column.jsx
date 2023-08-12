import React, { useState } from 'react';
import Modal from '../Modal/Modal';
import sprite from '../../images/sprite.svg';
import styles from './Column.module.css';
import Button from 'components/Button/Button';
// import Card from 'components/Card/Card';
import EditColumn from 'components/PopUps/EditColumn/EditColumn';

// const Column = ({title, cardList}) => {
const Column = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => setIsModalOpen(state => !state);

  return (
    <div className={styles.column__container}>
      <div className={styles.columnHeader}>
        <span className={styles.columnHeader__title}>To Do</span>
        <div className={styles.columnHeader__controls}>
          <button className={styles.columnHeader__button} onClick={toggleModal}>
            <svg
              width={16}
              height={16}
              aria-label="icon-pencil"
              className={styles.svg}
            >
              <title>Edit column</title>
              <use href={sprite + '#icon-pencil'} />
            </svg>
          </button>
          <button className={styles.columnHeader__button}>
            <svg
              width={16}
              height={16}
              aria-label="icon-trash"
              className={styles.svg}
            >
              <title>Delete column</title>
              <use href={sprite + '#icon-trash'} />
            </svg>
          </button>
        </div>
      </div>
      {/* <ul className={styles.cardList}>
        {cardList.map(card => (
          <li key={card.id}></li>
        ))}
      </ul> */}
      <Button icon="true" text="Add card" />
      {isModalOpen && (
        <Modal onClose={toggleModal}>
          <EditColumn />
        </Modal>
      )}
    </div>
  );
};

export default Column;
