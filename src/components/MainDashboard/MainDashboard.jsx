import sprite from '../../images/sprite.svg';
import { useEffect, useState } from 'react';
import Column from 'components/Column/Column';
import MainPlaceholder from 'components/MainPlaceholder/MainPlaceholder';
import styles from './MainDashboard.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { selectActiveBoard, selectBoardsList } from 'redux/boards/selectors';
import AddColumn from 'components/PopUps/AddColumn/AddColumn';
import Modal from 'components/Modal/Modal';
import { getActiveBoard } from 'redux/boards/operations';
import { useNavigate } from 'react-router-dom';

const MainDashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => setIsModalOpen(state => !state);

  const allBoards = useSelector(selectBoardsList);
  const activeBoard = useSelector(selectActiveBoard);
 

  // useEffect(() => {
  //   allBoards.length > 0 && dispatch(getActiveBoard(allBoards[0]._id));
  // }, [dispatch, allBoards]);

  // useEffect(() => {
  //   if (activeBoard && allBoards.length > 0) {
  //     navigate(`/home/${activeBoard._id}`);
  //   }
  // }, [navigate, activeBoard, allBoards]);

  const columns =
    activeBoard &&
    activeBoard.columns &&
    activeBoard.columns.length > 0 &&
    activeBoard;

  return (
    <>
      {allBoards.length > 0 ? (
        <>
          <div className={styles.container}>
            <button className={styles.button}>
              <svg
                width={28}
                height={28}
                aria-label="plus"
                className={styles.svg}
                onClick={toggleModal}
              >
                <title>Plus Icon</title>
                <use href={sprite + '#icon-plus'} />
              </svg>
              <span className={styles.buttonText}>Add another column</span>
            </button>
            {isModalOpen && (
              <Modal onClose={toggleModal}>
                <AddColumn toggleModal={toggleModal} />
              </Modal>
            )}
            {columns && <Column />}
          </div>
          {}
        </>
      ) : (
        <MainPlaceholder />
      )}
    </>
  );
};

export default MainDashboard;
