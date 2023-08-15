import { AddTaskCard } from 'components/AddTaskCard/AddTaskCard';
import Card from 'components/Card/Card';
import EditColumn from 'components/PopUps/EditColumn/EditColumn';
import { useState } from 'react';
import sprite from '../../images/sprite.svg';
import Modal from '../Modal/Modal';
import styles from './Column.module.css';
import { useSelector } from 'react-redux';
import { selectTheme } from 'redux/auth/selectors';
import DeleteColumn from './DeleteColumn';

import { StrictModeDroppable } from 'components/StrictModeDroppable/StrictModeDroppable';
import { Draggable } from 'react-beautiful-dnd';
import { selectFilter } from 'redux/boards/selectors';
import { normalizePriority } from 'helpers/normalizePriority';

const Column = ({ column }) => {
  const { _id, title, tasks, taskOrder } = column;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => setIsModalOpen(state => !state);
  const theme = useSelector(selectTheme);
  const selectedFilter = useSelector(selectFilter);
  const normalizedFilter = normalizePriority(selectedFilter);

  return (
    <StrictModeDroppable droppableId={_id} type="tasks">
      {provided => (
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
                  (theme === 'dark' && styles.columnHeader__buttonDark) ||
                  (theme === 'light' && styles.columnHeader__buttonLight) ||
                  (theme === 'violet' && styles.columnHeader__buttonViolet)
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
              <DeleteColumn id={_id} tasks={tasks} />
            </div>
          </div>
          {tasks && (
            <ul className={styles.cardList}>
              {taskOrder.map((taskId, index) => {
                const task = tasks.find(el => el._id === taskId);
                if (normalizedFilter !== 'show all') {
                  if (normalizedFilter !== task.priority) return null;
                }
                return (
                  <Draggable draggableId={task._id} index={index} key={taskId}>
                    {provided => (
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
                );
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
