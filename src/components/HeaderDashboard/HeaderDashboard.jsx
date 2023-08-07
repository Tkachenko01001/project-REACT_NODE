import sprite from '../../images/sprite.svg';
import styles from './HeaderDashboard.module.css';

import { useDispatch } from 'react-redux';
import { logOut } from 'redux/auth/operations';

const HeaderDashboard = () => {
  const dispatch = useDispatch();

  return (
    <div className={styles.wrapper}>
      {/* <h2 className={styles.title}>Project office</h2> */}
      <button className={styles.filter}>
        <svg className={styles.icon} width={16} height={16} aria-label="Filter">
          <title>Filter Icon</title>
          <use href={sprite + '#icon-filter'} />
        </svg>
        <span className={styles.filterText}>Filters</span>
      </button>

      <button className={styles.filter} type="button" onClick={() => dispatch(logOut())}>
        Logout
      </button>

    </div>
  );
};

export default HeaderDashboard;
