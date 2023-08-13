import { useState } from 'react';
import Modal from '../Modal/Modal';
import sprite from '../../images/sprite.svg';
import styles from './Column.module.css';
import Card from 'components/Card/Card';
import EditColumn from 'components/PopUps/EditColumn/EditColumn';
import { AddTaskCard } from 'components/AddTaskCard/AddTaskCard';
import { deleteColumn } from 'redux/boards/operations';
import { useDispatch } from 'react-redux';
// import SimpleBar from 'simplebar';
import { selectTheme } from 'redux/auth/selectors';
import { useSelector } from 'react-redux';
import { StrictModeDroppable } from 'components/StrictModeDroppable/StrictModeDroppable';
import { Draggable } from 'react-beautiful-dnd';

const Column = ({ column }) => {
  const { _id, title, tasks, taskOrder } = column;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => setIsModalOpen(state => !state);
  const dispatch = useDispatch();
  const theme = useSelector(selectTheme);

  const onDeleteClick = () => {
    dispatch(deleteColumn(_id));
  };
  // const myScroll = new SimpleBar(document.getElementById('demo'));
  return (
    <StrictModeDroppable droppableId={_id} type='tasks'>
      {(provided) => (
        <div
          className={styles.column__container}
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          <div
            className={
              theme === 'dark' ? styles.columnHeaderDark : styles.columnHeader
            }
          >
            <span className={styles.columnHeader__title}>{title}</span>
            <div className={styles.columnHeader__controls}>
              <button
                className={
                  theme === 'dark'
                    ? styles.columnHeader__buttonDark
                    : styles.columnHeader__button
                }
                onClick={toggleModal}
              >
                <svg
                  width={16}
                  height={16}
                  aria-label="icon-pencil"
                  className={styles.svg}
                >
                  <title>Edit column</title>
                  <use href={sprite + '#icon-pencil'} />
                </svg>
              </button>
              <button
                className={
                  theme === 'dark'
                    ? styles.columnHeader__buttonDark
                    : styles.columnHeader__button
                }
                onClick={onDeleteClick}
              >
                <svg
                  width={16}
                  height={16}
                  aria-label="icon-trash"
                  className={styles.svg}
                >
                  <title>Delete column</title>
                  <use href={sprite + '#icon-trash'} />
                </svg>
              </button>
            </div>
          </div>
          {tasks && (
            <ul className={styles.cardList}>
              {taskOrder.map((taskId, index) => {
                const task = tasks.find((el) => el._id === taskId);
                return (
                  <Draggable
                    draggableId={task._id}
                    index={index}  
                    key={taskId}
                  >
                    {(provided) => (
                      <li
                        key={task._id}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <Card task={task} />
                      </li>
                    )}
                  </Draggable>
                )
              })}
              {provided.placeholder}
            </ul>
          )}
          <AddTaskCard columnId={_id} />
          {isModalOpen && (
            <Modal onClose={toggleModal}>
              <EditColumn id={_id} title={title} onClose={toggleModal} />
            </Modal>
          )}
        </div>
      )}
    </StrictModeDroppable>
  );
};

export default Column;
