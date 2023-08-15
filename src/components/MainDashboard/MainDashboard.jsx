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
import { StrictModeDroppable } from 'components/StrictModeDroppable/StrictModeDroppable';
import { Draggable } from 'react-beautiful-dnd';
import { transferTask, transferColumn } from 'redux/boards/operations';

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
    const { type, destination, source, reason, draggableId: id } = result;
    if (!destination || reason === "CANCEL") return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;
    
    if (type === 'tasks') {
      dispatch(transferTask({
        id,
        data: { destination, source },
      }));
    };

    if (type === 'columns') {
      dispatch(transferColumn({
        id,
        data: { destination, source },
      }));
    };
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
                  <StrictModeDroppable droppableId={columns._id} direction='horizontal' type='columns'>
                    {(provided) => (
                      <ul
                        className={styles.columnList}
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                      >
                        {activeBoard.columnOrder.map((columnId, index) => {
                          const column = activeBoard.columns.find((el) => el._id === columnId);
                          return (
                            <Draggable draggableId={column._id} index={index} key={column._id}>
                              {(provided) => (
                                <li
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                >
                                  <Column column={column} />
                                </li>
                              )}
                          </Draggable>
                          )
                        })}
                        {provided.placeholder}
                      </ul>
                    )}
                  </StrictModeDroppable>
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