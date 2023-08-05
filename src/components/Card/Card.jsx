import sprite from '../../images/sprite.svg';
import styles from './Card.module.css';

const Card = () => {
  return (
    <div className={styles.card}>
      <div className={styles.textWrapper}>
      <h4 className={styles.title}>Card Title</h4>
      <p className={styles.description}>
        Conduct in-depth research and analysis on the project's topic, gather
        relevant data, and identify key insights to inform decision-making and
        project planning.
      </p>
      </div>
      
      <div className={styles.wrapper}>
      <div className={styles.priority}>
        <h5 className={styles.subTitle}>Priority</h5>
        <div className={styles.priorityCircle}></div>
        <p className={styles.priorityText}>Low</p>
      </div>
      <div className={styles.deadline}>
        <h5 className={styles.subTitle}>Deadline</h5>
        <p className={styles.deadlineText}>14/08/2023</p>
      </div>
      {/* <h4>{card.title}</h4>
      <p>{card.description}</p>
      <div>
        <h5>Priority</h5>
        <div></div>
        <p>{card.priority}</p>
      </div>
      <div>
        <h5>Deadline</h5>
        <p>{card.deadline}</p>
      </div> */}
      <ul className={styles.cardIcons}>
        <li className={styles.cardIcon}>
          <button className={styles.cardButton}>
            <svg
              width={16}
              height={16}
              aria-label="icon-bell"
              className={styles.svg}
            >
              <title>Bell Icon</title>
              <use href={sprite + '#icon-bell'} />
            </svg>
          </button>
        </li>
        <li className={styles.cardIcon}>
          <button className={styles.cardButton}>
            <svg
              width={16}
              height={16}
              aria-label="icon-arrow-circle-broken-right"
              className={styles.svg}
            >
              <title>Arrow Circle Right Icon</title>
              <use href={sprite + '#icon-arrow-circle-broken-right'} />
            </svg>
          </button>
        </li>
        <li className={styles.cardIcon}>
          <button className={styles.cardButton}>
            <svg
              width={16}
              height={16}
              aria-label="icon-pencil"
              className={styles.svg}
            >
              <title>Pencil Icon</title>
              <use href={sprite + '#icon-pencil'} />
            </svg>
          </button>
        </li>
        <li className={styles.cardIcon}>
          <button className={styles.cardButton}>
            <svg
              width={16}
              height={16}
              aria-label="icon-trash"
              className={styles.svg}
            >
              <title>Trash Icon</title>
              <use href={sprite + '#icon-trash'} />
            </svg>
          </button>
        </li>
      </ul>
      </div>
      
    </div>
  );
};

export default Card;
