import sprite from '../../images/sprite.svg';
import styles from './Card.module.css';

const Card = () => {
  return (
    <div className={styles.container}>
      <h4>Card Title</h4>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa beatae
        dolores facilis dignissimos consequatur maxime enim dolor corporis
        excepturi doloribus accusamus odit sed, iure totam autem recusandae
        tempora quisquam? Provident!
      </p>
      <div>
        <h5>Priority</h5>
        <div></div>
        <p>Low</p>
      </div>
      <div>
        <h5>Deadline</h5>
        <p>14.08.2023</p>
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
      <ul>
        <li>
          <button className={styles.button}>
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
        <li>
          <button className={styles.button}>
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
        <li>
          <button className={styles.button}>
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
        <li>
          <button className={styles.button}>
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
  );
};

export default Card;
