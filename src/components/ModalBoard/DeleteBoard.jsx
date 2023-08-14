import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ClipLoader from 'react-spinners/ClipLoader';
import { deleteBoard } from 'redux/boards/operations';
import {
  selectActiveBoard,
  selectIsBoardsLoading,
} from 'redux/boards/selectors';
import { selectTheme } from 'redux/auth/selectors';

import ModalPortal from 'components/Modal/ModalPortal';
import sprite from '../../images/sprite.svg';
import css from '../Sidebar/Sidebar.module.css';
import styles from './ModalBoard.module.css';

const DeleteBoard = ({ checked }) => {
  const theme = useSelector(selectTheme);
  const activeBoard = useSelector(selectActiveBoard);
  const { _id, columns } = activeBoard;
  const isBoardsLoading = useSelector(selectIsBoardsLoading);
  const [startLoading, setStartLoading] = useState(false);

  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => setIsModalOpen(state => !state);

  const handleAgreement = () => {
    if (activeBoard && columns.length === 0) {
      setStartLoading(true);
      dispatch(deleteBoard(_id)).then(() => {
        !isBoardsLoading && toggleModal();
      });
    }
  };

  const iconActive = !checked
    ? css.sidebarNewBoardButton
    : css.sidebarNewBoardButtonActive;
  return (
    <div>
      <button className={iconActive} type="button" onClick={toggleModal}>
        <svg className={css.sidebarNewBoardIcon}>
          <use href={sprite + '#icon-trash'} />
        </svg>
      </button>
      {isModalOpen && (
        <ModalPortal onClose={toggleModal}>
          <h1 className={styles.title}>Delete Board</h1>
          {activeBoard && columns && columns.length === 0 ? (
            <h3 className={styles.text}>
              Are you sure you want to delete the board?
            </h3>
          ) : (
            <h3 className={styles.text}>
              Sorry, but you cannot delete a board that has columns... Clean it
              first!
            </h3>
          )}
          {activeBoard && columns && columns.length !== 0 ? (
            <button
              className={theme === 'violet' ? styles.btnViolet : styles.btn}
              type="button"
              onClick={toggleModal}
            >
              Close
            </button>
          ) : (
            <>
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
            </>
          )}
        </ModalPortal>
      )}
    </div>
  );
};

export default DeleteBoard;
