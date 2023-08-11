import sprite from '../../images/sprite.svg';
import MainPlaceholder from 'components/MainPlaceholder/MainPlaceholder';
import styles from './MainDashboard.module.css';
import { useSelector } from 'react-redux';
import { selectBoardsList } from 'redux/boards/selectors';

const MainDashboard = () => {

  const allBoards = useSelector(selectBoardsList);

  return (
    <>
      {allBoards.length > 0 ? (
        <>
          <div className={styles.container}>
            <button className={styles.button}>
              <svg
                width={28}
                height={28}
                aria-label="plus"
                className={styles.svg}
              >
                <title>Plus Icon</title>
                <use href={sprite + '#icon-plus'} />
              </svg>
              <span className={styles.buttonText}>Add another column</span>
            </button>
          </div>
        </>
      ) : (
        <MainPlaceholder />
      )}
    </>
  );
};

export default MainDashboard;
