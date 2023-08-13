import sprite from '../../images/sprite.svg';
import { useState } from 'react';
import Column from 'components/Column/Column';
import MainPlaceholder from 'components/MainPlaceholder/MainPlaceholder';
import styles from './MainDashboard.module.css';
import { useSelector } from 'react-redux';
import { selectActiveBoard, selectBoardsList } from 'redux/boards/selectors';
import AddColumn from 'components/PopUps/AddColumn/AddColumn';
import Modal from 'components/Modal/Modal';
import { selectTheme } from 'redux/auth/selectors';

const MainDashboard = () => {
  const theme = useSelector(selectTheme);
  const [selectedPriority, setSelectedPriority] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => setIsModalOpen(state => !state);

  const allBoards = useSelector(selectBoardsList);
  const activeBoard = useSelector(selectActiveBoard);

  const columns =
    activeBoard &&
    activeBoard.columns &&
    activeBoard.columns.length > 0 &&
    activeBoard;

  const handlePriorityChange = event => {
    const newPriority = event.target.value;
    setSelectedPriority(newPriority);
  };

  return (
    <>
      {allBoards.length > 0 ? (
        <>
          <div className={styles.container}>
            {isModalOpen && (
              <Modal onClose={toggleModal}>
                <AddColumn toggleModal={toggleModal} />
              </Modal>
            )}
            {columns && (
              <ul className={styles.columnList}>
                {activeBoard.columns
                  .filter(
                    column =>
                      !selectedPriority || column.priority === selectedPriority
                  )
                  .map(column => (
                    <li key={column._id}>
                      <Column column={column} />
                    </li>
                  ))}
              </ul>
            )}
            <button
              className={theme === 'dark' ? styles.buttonDark : styles.button}
              onClick={toggleModal}
            >
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
          {}
        </>
      ) : (
        <MainPlaceholder />
      )}
    </>
  );
};

export default MainDashboard;
