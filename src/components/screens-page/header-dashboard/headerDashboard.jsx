import sprite from '../../../images/sprite.svg';
import styles from './headerDashboard.module.css';

const HeaderDashboard = () => {
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Project office</h2>
      <button className={styles.filter}>
        <svg className={styles.icon} width={16} height={16} aria-label="Filter">
          <title>Filter Icon</title>
          <use href={sprite + '#icon-filter'} />
        </svg>
        <span className={styles.filterText}>Filters</span>
      </button>
    </div>
  );
};

export default HeaderDashboard;
