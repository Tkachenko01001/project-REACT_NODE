import sprite from '../../images/sprite.svg';
import MainButtonNewBoard from './MainButtonNewBoard/MainButtonNewBoard';
import { useEffect, useState } from 'react';
import Column from 'components/Column/Column';
import styles from './MainDashboard.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { selectActiveBoard, selectBoardsList } from 'redux/boards/selectors';
import AddColumn from 'components/PopUps/AddColumn/AddColumn';
import Modal from 'components/Modal/Modal';
import { getActiveBoard } from 'redux/boards/operations';

const MainDashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => setIsModalOpen(state => !state);
  const allBoards = useSelector(selectBoardsList);
  const activeBoard = useSelector(selectActiveBoard);
  const dispatch = useDispatch();

  useEffect(() => {
    allBoards.length > 0 && dispatch(getActiveBoard(allBoards[0]._id))
  }, [dispatch, allBoards]);

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
        <div className={styles.mainDashboardContainer}>
          <p className={styles.dashboardDefaultParagraph}>
            Before starting your project, it is essential
            <button
              type="button"
              className={styles.createBoard}
              onClick={toggleModal}
            >
              to create a board
            </button>
            to visualize and track all the necessary tasks and milestones. This
            board serves as a powerful tool to organize the workflow and ensure
            effective collaboration among team members.
          </p>
          <MainButtonNewBoard
            isModalOpen={isModalOpen}
            toggleModal={toggleModal}
          />
        </div>
      )}
    </>
  );
};

export default MainDashboard;
