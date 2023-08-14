import { EditTaskCard } from 'components/EditTaskCard/EditTaskCard';
import sprite from '../../images/sprite.svg';
import styles from './Card.module.css';
import DeleteTask from './DeleteCard';
import { selectTheme } from 'redux/auth/selectors';
import { useSelector } from 'react-redux';

const Card = ({ task }) => {
  const { _id: id, title, description, priority, deadline } = task;
  const theme = useSelector(selectTheme);

  const deadlineInDate = new Date(
    deadline.replace('/', '.').replace(/(\d+).(\d+).(\d+)/, '$3/$2/$1')
  );
  const currentDate = new Date();
  const deadlineNow = currentDate > deadlineInDate;

  return (
    <div
      className={
        (theme === 'dark' && styles.dark) ||
        (theme === 'light' && styles.light) ||
        (theme === 'violet' && styles.violet)
      }
    >
      <div
        className={`${styles.card} ${
          styles[
            theme === 'dark'
              ? `priorityDark_${priority}`
              : `priority_${priority}`
          ]
        }`}
      >
        <div className={styles.textWrapper}>
          <h4 className={styles.title}>{title}</h4>
          <p className={styles.description}>{description}</p>
        </div>
        <div className={theme === 'dark' ? styles.wrapperDark : styles.wrapper}>
          <div className={styles.priority}>
            <h5 className={styles.subTitle}>Priority</h5>
            <p
              className={`${styles.priorityText} ${
                styles[
                  theme === 'dark'
                    ? `priorityDark_${priority}`
                    : `priority_${priority}`
                ]
              }`}
            >
              {priority}
            </p>
          </div>
          <div className={styles.deadline}>
            <h5 className={styles.subTitle}>Deadline</h5>
            <p className={styles.deadlineText}>{deadline}</p>
          </div>
          <ul className={styles.cardIcons}>
            <li className={styles.cardIcon}>
              {deadlineNow && (
                <button className={styles.cardButtonBell}>
                  <svg
                    width={16}
                    height={16}
                    aria-label="icon-bell"
                    className={
                      theme === 'violet' ? styles.bellViolet : styles.bell
                    }
                  >
                    <title>Deadline</title>
                    <use href={sprite + '#icon-bell'} />
                  </svg>
                </button>
              )}
            </li>
            {/* <li className={styles.cardIcon}>
              <button
                className={
                  (theme === 'dark' && styles.cardButtonDark) ||
                  (theme === 'light' && styles.cardButtonLight) ||
                  (theme === 'violet' && styles.cardButtonViolet)
                }
              >
                <svg
                  width={16}
                  height={16}
                  aria-label="icon-arrow-circle-broken-right"
                  className={styles.svg}
                >
                  <title>Move task</title>
                  <use href={sprite + '#icon-arrow-circle-broken-right'} />
                </svg>
              </button>
            </li> */}
            <li className={styles.cardIcon}>
                 <EditTaskCard task={task} />
            </li>
            <li className={styles.cardIcon}>
              <DeleteTask id={id} />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Card;
