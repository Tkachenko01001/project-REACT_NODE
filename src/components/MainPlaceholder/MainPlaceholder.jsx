import NewBoard from 'components/NewBoard/NewBoard';
import { useState } from 'react';

import styles from './MainPlaceholder.module.css';

const MainPlaceholder = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => setIsModalOpen(state => !state);

  return (
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
      {isModalOpen && <NewBoard toggleModal={toggleModal} />}
    </div>
  );
};

export default MainPlaceholder;
