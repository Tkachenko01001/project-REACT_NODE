import { useState } from 'react';
import Modal from '../Modal/Modal';
import sprite from '../../images/sprite.svg';
import styles from './Column.module.css';
import Card from 'components/Card/Card';
import EditColumn from 'components/PopUps/EditColumn/EditColumn';
import { AddTaskCard } from 'components/AddTaskCard/AddTaskCard';
import { deleteColumn } from 'redux/boards/operations';
import { useDispatch } from 'react-redux';

const Column = ({ column }) => {
  const { _id, title, tasks } = column;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => setIsModalOpen(state => !state);
  const dispatch = useDispatch();

  const onDeleteClick = () => {
    dispatch(deleteColumn(_id));
  };

  return (
    <div className={styles.column__container}>
      <div className={styles.columnHeader}>
        <span className={styles.columnHeader__title}>{title}</span>
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
          <button
            className={styles.columnHeader__button}
            onClick={onDeleteClick}
          >
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
      {tasks && (
        <ul className={styles.cardList}>
          {tasks.map(task => (
            <li key={task._id}>
              <Card task={task} />
            </li>
          ))}
        </ul>
      )}
      <AddTaskCard columnId={_id} />
      {isModalOpen && (
        <Modal onClose={toggleModal}>
          <EditColumn id={_id} title={title} onClose={toggleModal} />
        </Modal>
      )}
    </div>
  );
};

export default Column;
