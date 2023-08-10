import Modal from 'components/Modal/Modal';
import { useState } from 'react';
import sprite from '../../images/sprite.svg';
import styles from './HeaderDashboard.module.css';

const HeaderDashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPriority, setSelectedPriority] = useState('');

  const toggleModal = () => setIsOpen(state => !state);

  const options = [
    { color: 'rgba(255, 255, 255, 0.3)', priority: 'Without priority' },
    { color: '#8FA1D0', priority: 'Low' },
    { color: '#E09CB5', priority: 'Medium' },
    { color: '#BEDBB0', priority: 'High' },
  ];

  const handlePriorityChange = event => {
    setSelectedPriority(event.target.value);
  };

  return (
    <div className={styles.wrapper}>
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
