import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteBoard } from 'redux/boards/operations';

import sprite from '../../images/sprite.svg';
import styles from '../EditBoard/EditBoard.module.css';
import Modal from '../Modal/Modal';
import css from '../Sidebar/Sidebar.module.css';

const DeleteBoard = ({ id, columns }) => {
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => setIsModalOpen(state => !state);

  const handleSubmit = event => {
    event.preventDefault();
    dispatch(deleteBoard(id));
    toggleModal();
  };
  return (
    <div>
      <button
        className={css.sidebarNewBoardButton}
        type="button"
        onClick={toggleModal}
      >
        <svg className={css.sidebarNewBoardIcon}>
          <use href={sprite + '#icon-trash'} />
        </svg>
      </button>
      {isModalOpen && (
        <Modal onClose={toggleModal}>
          <form onSubmit={handleSubmit}>
            <h1 className={styles.title}>Delete Board</h1>
            {columns.length === 0 ? (
              <h3 className={styles.text}>
                Are you sure you want to delete the board?
              </h3>
            ) : (
              <h3 className={styles.text}>
                Sorry, but you cannot delete a board that has columns... Clean
                it first!
              </h3>
            )}

            <button className={styles.btn} type="submit">
              Yes
            </button>
            <button className={styles.btn} type="button" onClick={toggleModal}>
              No
            </button>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default DeleteBoard;
