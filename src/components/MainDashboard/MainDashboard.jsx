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
import { DragDropContext } from "react-beautiful-dnd";
import { useDispatch } from 'react-redux';
import { transferTask } from 'redux/boards/operations';

const MainDashboard = () => {
  const dispatch = useDispatch();
  const theme = useSelector(selectTheme);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => setIsModalOpen(state => !state);

  const allBoards = useSelector(selectBoardsList);
  const activeBoard = useSelector(selectActiveBoard);

  const columns =
    activeBoard &&
    activeBoard.columns &&
    activeBoard.columns.length > 0 &&
    activeBoard;
  
  const onDragEnd = (result) => {
    const { destination, source, reason, draggableId: id } = result;
    if (!destination || reason === "CANCEL") return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;
    
    dispatch(transferTask({
      id,
      data: { destination, source },
    }))
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
              <DragDropContext onDragEnd={onDragEnd}>
                <ul
                  className={styles.columnList}
                >
                  {activeBoard.columns.map(column => (
                    <li key={column._id}>
                      <Column column={column} />
                    </li>
                  ))}
                </ul>
              </DragDropContext>
            )}
            <button
              className={
                (theme === 'dark' && styles.buttonDark) ||
                (theme === 'light' && styles.buttonLight) ||
                (theme === 'violet' && styles.buttonViolet)
              }
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
              <span
                className={
                  theme === 'violet'
                    ? styles.buttonTextViolet
                    : styles.buttonText
                }
              >
                Add another column
              </span>
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
