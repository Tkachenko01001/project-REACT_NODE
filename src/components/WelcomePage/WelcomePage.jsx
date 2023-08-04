import React from 'react';
import styles from './WelcomePage.module.css';
import sprite from '../../images/sprite.svg';

const WelcomePage = () => {
  return (
    <section className={styles.section}>
      <div className={styles.wrapper}>
        <div className={styles.img}></div>
        <div className={styles.wrap}>
          <svg className={styles.svg}>
            <use href={sprite + '#icon-icon'} />
          </svg>
          <h1 className={styles.title}>Task Pro</h1>
        </div>
        <p className={styles.text}>
          Supercharge your productivity and take control of your tasks with Task
          Pro - Don't wait, start achieving your goals now!
        </p>
        <button className={styles.btn} to="/auth/register">
          Registration
        </button>
        <button className={styles.btn} to="/auth/login">
          Log In
        </button>
      </div>
    </section>
  );
};

export default WelcomePage;
