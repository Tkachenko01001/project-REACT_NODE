import Modal from 'components/Modal/Modal';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getActiveBoard } from 'redux/boards/operations';
import { selectActiveBoard, selectBoardsList } from 'redux/boards/selectors';
import sprite from '../../images/sprite.svg';
import styles from './HeaderDashboard.module.css';
import { selectTheme } from 'redux/auth/selectors';
import { setFilter } from 'redux/boards/filterSlice';

const HeaderDashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPriority, setSelectedPriority] = useState('');
  const { boardName } = useParams();
  const dispatch = useDispatch();
  const theme = useSelector(selectTheme);

  useEffect(() => {
    boardName && dispatch(getActiveBoard(boardName));
  }, [dispatch, boardName]);

  const allBoards = useSelector(selectBoardsList);
  const currentBoard = useSelector(selectActiveBoard);

  const toggleModal = () => setIsOpen(state => !state);

  const options = [
    {
      color:
        theme === 'dark' ? 'rgba(255, 255, 255, 0.3)' : 'rgba(22, 22, 22, 0.3)',
      priority: 'Without priority',
    },
    { color: '#8FA1D0', priority: 'Low' },
    { color: '#E09CB5', priority: 'Medium' },
    { color: '#BEDBB0', priority: 'High' },
  ];

  const handlePriorityChange = event => {
    const newPriority = event.target.value;
    setSelectedPriority(newPriority);
    dispatch(setFilter(newPriority));
  };
  const titleToShow =
    allBoards.length > 0 &&
    (currentBoard.title ? currentBoard.title : allBoards[0].title);

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>{titleToShow}</h2>
      <button
        className={theme === 'violet' ? styles.filterViolet : styles.filter}
        onClick={toggleModal}
      >
        <svg
          className={
            (theme === 'dark' && styles.iconDark) ||
            (theme === 'light' && styles.iconLight) ||
            (theme === 'violet' && styles.iconViolet)
          }
          width={16}
          height={16}
          aria-label="Filter"
        >
          <title>Filter Icon</title>
          <use href={sprite + '#icon-filter'} />
        </svg>
        <span className={styles.filterText}>Filters</span>
      </button>
      {isOpen && (
        <Modal onClose={toggleModal}>
          <form className={styles.modalFilterWrapper}>
            <h2 className={styles.modalFilter}>Filters</h2>
            <div className={styles.modalBoard}></div>
            <div className={styles.modalLabel}>
              <h3 className={styles.modalLabelHeader}>Label color</h3>
              <button
                type="button"
                className={styles.modalShowAll}
                onClick={handlePriorityChange}
              >
                show all
              </button>
            </div>
            <div className={styles.modalListOptions}>
              {options.map((option, index) => (
                <label key={index} className={styles.radio}>
                  <input
                    type="radio"
                    className={styles.modalListOptionsElement}
                    name="priority"
                    value={`${option.priority}`}
                    checked={selectedPriority === option.priority}
                    onChange={handlePriorityChange}
                  />
                  <div
                    className={styles.radioText}
                    style={{ backgroundColor: option.color }}
                  ></div>
                  <div
                    className={styles.modalCheckbox}
                    style={{
                      color:
                        option.priority === selectedPriority
                          ? 'white'
                          : 'rgba(255, 255, 255, 0.50)',

                      cursor: 'pointer',
                    }}
                  >
                    {option.priority}
                  </div>
                </label>
              ))}
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default HeaderDashboard;
