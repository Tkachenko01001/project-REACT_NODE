import sprite from '../../images/sprite.svg';

import styles from './MainDashboard.module.css'

const MainDashboard = () => {
    return (
      <div className={styles.container}>
        <button className={styles.button}>
          <svg width={28} height={28} aria-label="plus">
            <title>Plus Icon</title>
            <use href={sprite + '#icon-plus1'} />
          </svg>
          <span className={styles.buttonText}>Add another column</span>
        </button>
      </div>
    );
};

export default MainDashboard;