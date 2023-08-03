import React from 'react';
import css from './WelcomePage.module.css';
import sprite from '../../images/sprite.svg';

const WelcomePage = () => {
  return (
    <section className={css.section}>
      <div className={css.wrapper}>
        <div className={css.img}></div>
        <div className={css.wrap}>
          <svg className={css.svg}>
            <use href={sprite + '#icon-icon'} />
          </svg>
          <h1 className={css.title}>Task Pro</h1>
        </div>
        <p className={css.text}>
          Supercharge your productivity and take control of your tasks with Task
          Pro - Don't wait, start achieving your goals now!
        </p>
        <button className={css.btn} to="/auth/register">
          Registration
        </button>
        <button className={css.btn} to="/auth/login">
          Log In
        </button>
      </div>
    </section>
  );
};

export default WelcomePage;
