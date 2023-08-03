import React from 'react';
import css from './WelcomePage.module.css';

import sprite from '../../images/sprite.svg';

const WelcomePage = () => {
  return (
    <container className={css.container}>
      <section className={css.section}>
        <img className={css.img} src="" alt="The young man at the computer" />
        <div className={css.wrap}>
          <svg className={css.svg}>
            <use href={sprite + '#icon-plus'} />
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
      </section>
    </container>
  );
};

export default WelcomePage;
