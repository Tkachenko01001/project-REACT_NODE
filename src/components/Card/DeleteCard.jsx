import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ClipLoader from 'react-spinners/ClipLoader';
import { deleteTask } from 'redux/boards/operations';
import { selectIsBoardsLoading } from 'redux/boards/selectors';
import style from './Card.module.css';

import sprite from '../../images/sprite.svg';
import ModalPortal from '../Modal/ModalPortal';
import styles from '../ModalBoard/ModalBoard.module.css';
import { selectTheme } from 'redux/auth/selectors';

const DeleteTask = ({ id }) => {
  const isBoardsLoading = useSelector(selectIsBoardsLoading);
  const [startLoading, setStartLoading] = useState(false);
  const theme = useSelector(selectTheme);

  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => setIsModalOpen(state => !state);

  const handleAgreement = () => {
    setStartLoading(true);
    dispatch(deleteTask(id)).then(() => {
      !isBoardsLoading && toggleModal();
    });
  };

  return (
    <div>
      <button
        className={
          (theme === 'dark' && style.cardButtonDark) ||
          (theme === 'light' && style.cardButtonLight) ||
          (theme === 'violet' && style.cardButtonViolet)
        }
        onClick={toggleModal}
      >
        <svg
          width={16}
          height={16}
          aria-label="icon-trash"
          className={style.svg}
        >
          <title>Delete task</title>
          <use href={sprite + '#icon-trash'} />
        </svg>
      </button>

      {isModalOpen && (
        <ModalPortal onClose={toggleModal}>
          <h1 className={styles.title}>Delete task</h1>

          <h3 className={styles.text}>
            Are you sure you want to delete the task?
          </h3>

          <button
            className={theme === 'violet' ? styles.btnViolet : styles.btn}
            type="button"
            disabled={isBoardsLoading}
            onClick={handleAgreement}
          >
            {startLoading && isBoardsLoading && (
              <ClipLoader color="#1f1f1f" size={30} />
            )}
            Yes
          </button>
          <button
            className={theme === 'violet' ? styles.btnViolet : styles.btn}
            type="button"
            onClick={toggleModal}
          >
            No
          </button>
        </ModalPortal>
      )}
    </div>
  );
};

export default DeleteTask;
