import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ClipLoader from 'react-spinners/ClipLoader';
import { deleteColumn } from 'redux/boards/operations';
import { selectIsBoardsLoading } from 'redux/boards/selectors';
import style from '../Column/Column.module.css';

import sprite from '../../images/sprite.svg';
import ModalPortal from '../Modal/ModalPortal';
import styles from '../ModalBoard/ModalBoard.module.css';

const DeleteColumn = ({ id, tasks }) => {
  const isBoardsLoading = useSelector(selectIsBoardsLoading);
  const [startLoading, setStartLoading] = useState(false);

  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => setIsModalOpen(state => !state);

  const handleAgreement = () => {
    setStartLoading(true);
    dispatch(deleteColumn(id)).then(() => {
      !isBoardsLoading && toggleModal();
    });
  };

  return (
    <div>
      <button className={style.columnHeader__button} onClick={toggleModal}>
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
      {isModalOpen && (
        <ModalPortal onClose={toggleModal}>
          <h1 className={styles.title}>Delete column</h1>
          {tasks.length === 0 ? (
            <h3 className={styles.text}>
              Are you sure you want to delete the column?
            </h3>
          ) : (
            <h3 className={styles.text}>
              Sorry, but you cannot delete a column that has tasks... Clean it
              first!
            </h3>
          )}
          {tasks.length !== 0 ? (
            <button className={styles.btn} type="button" onClick={toggleModal}>
              Close
            </button>
          ) : (
            <>
              <button
                className={styles.btn}
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
                className={styles.btn}
                type="button"
                onClick={toggleModal}
              >
                No
              </button>
            </>
          )}
        </ModalPortal>
      )}
    </div>
  );
};

export default DeleteColumn;
