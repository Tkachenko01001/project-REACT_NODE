import sprite from '../../images/sprite.svg';
import MainButtonNewBoard from './MainButtonNewBoard/MainButtonNewBoard';
import { useState } from 'react';

import styles from './MainDashboard.module.css';
import { useSelector } from 'react-redux';
import { selectBoardsList } from 'redux/boards/selectors';

const MainDashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => setIsModalOpen(state => !state);
  const allBoards = useSelector(selectBoardsList);

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
            >
              <title>Plus Icon</title>
              <use href={sprite + '#icon-plus'} />
            </svg>
            <span className={styles.buttonText}>Add another column</span>
          </button>
        </div>
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
