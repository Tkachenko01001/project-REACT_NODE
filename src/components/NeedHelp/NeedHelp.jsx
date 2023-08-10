import sprite from '../../images/sprite.svg';
import cactus from '../../images/cactus.png';
import cactus2x from '../../images/cactus@2x.png';
import cactus3x from '../../images/cactus@3x.png';
import css from './NeedHelp.module.css';
import { useSelector } from 'react-redux';
import { selectTheme } from 'redux/auth/selectors';

export const NeedHelp = () => {
  const theme = useSelector(selectTheme);
  return (
    <section className={css.sidebarHelp}>
      <div
        className={
          (theme === 'dark' && css.dark) ||
          (theme === 'light' && css.light) ||
          (theme === 'violet' && css.violet)
        }
      >
        <div>
          <picture>
            <source srcSet={`${cactus} 1x, ${cactus2x} 2x,${cactus3x} 3x`} />
            <img srcSet={`${cactus} 1x`} alt="cactus" />
          </picture>
        </div>
        <div className={css.sidebarHelpBox}>
          <p className={css.sidebarHelpBoxItem}>
            If you need help with{' '}
            <a className={css.sidebarHelpBoxLink} href="/#">
              TaskPro
            </a>
            , check out our support resources or reach out to our customer
            support team.
          </p>
        </div>
        <div className={css.sidebarHelpWrap}>
          <svg className={css.sidebarHelpIcon}>
            <use href={sprite + '#icon-help-circle'}></use>
          </svg>
          <p className={css.sidebarHelpNeedHelp}>Need help?</p>
        </div>
      </div>
    </section>
  );
};
