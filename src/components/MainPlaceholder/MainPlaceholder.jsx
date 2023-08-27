import NewBoardMainPlaceholder from 'components/ModalBoard/NewBoardMainPlaceholder';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectTheme } from 'redux/auth/selectors';
import styles from './MainPlaceholder.module.css';

const MainPlaceholder = () => {
  const theme = useSelector(selectTheme);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => setIsModalOpen(state => !state);

  return (
    <div className={styles.mainDashboardContainer}>
      <p className={styles.dashboardDefaultParagraph}>
        Before starting your project, it is essential
        <button
          type="button"
          className={
            theme === 'violet' ? styles.createBoardViolet : styles.createBoard
          }
          onClick={toggleModal}
        >
          to create a board
        </button>
        to visualize and track all the necessary tasks and milestones. This
        board serves as a powerful tool to organize the workflow and ensure
        effective collaboration among team members.
      </p>
      {isModalOpen && (
        <NewBoardMainPlaceholder setIsModalOpen={setIsModalOpen} />
      )}
    </div>
  );
};

export default MainPlaceholder;
