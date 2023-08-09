import Modal from 'components/Modal/Modal';
import { useState } from 'react';
import sprite from '../../images/sprite.svg';
import styles from './HeaderDashboard.module.css';

const HeaderDashboard = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => setIsOpen(state => !state);

    const options = [
      { color: 'rgba(255, 255, 255, 0.3)', priority: 'Without priority' },
      { color: '#8FA1D0', priority: 'Low' },
      { color: '#E09CB5', priority: 'Medium' },
      { color: '#BEDBB0', priority: 'High' },
    ];

  return (
    <div className={styles.wrapper}>
      {/* <h2 className={styles.title}>Project office</h2> */}
      <button className={styles.filter} onClick={toggleModal}>
        <svg className={styles.icon} width={16} height={16} aria-label="Filter">
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
              <button type="button" className={styles.modalShowAll}>
                show all
              </button>
            </div>
            <div className={styles.modalListOptions}>
              {options.map((option, index) => (
                <label
                  key={index}
                  className={styles.modalCheckbox}
                >
                  <span
                    className={styles.customCheckbox}
                    style={{ backgroundColor: option.color }}
                  >
                    <span className={styles.customBall}></span>
                  </span>
                  <input
                    type="checkbox"
                    className={styles.modalListOptionsElement}
                    name="priority"
                    value={`${option.priority}`}
                  />
                  <span className={styles.checkboxText}>{option.priority}</span>
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
