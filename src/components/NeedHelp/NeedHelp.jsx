import { HelpForm } from 'components/HelpForm/HelpForm';
import { useSelector } from 'react-redux';
import { selectTheme } from 'redux/auth/selectors';
import cactus from '../../assets/images/png/cactus.png';
import cactus2x from '../../assets/images/png/cactus@2x.png';
import cactus3x from '../../assets/images/png/cactus@3x.png';
import sprite from '../../assets/svg/sprite.svg';
import css from './NeedHelp.module.css';

export const NeedHelp = () => {
  const theme = useSelector(selectTheme);
  return (
    <div
      className={
        (theme === 'dark' && css.dark) ||
        (theme === 'light' && css.light) ||
        (theme === 'violet' && css.violet)
      }
    >
      <div className={css.sidebarHelp}>
        <picture>
          <source srcSet={`${cactus} 1x, ${cactus2x} 2x,${cactus3x} 3x`} />
          <img srcSet={`${cactus} 1x`} alt="cactus" />
        </picture>

        <div className={css.sidebarHelpBox}>
          <HelpForm />
        </div>
        <div className={css.sidebarHelpWrap}>
          <svg className={css.sidebarHelpIcon}>
            <use href={sprite + '#icon-help-circle'}></use>
          </svg>
          <p className={css.sidebarHelpNeedHelp}>Need help?</p>
        </div>
      </div>
    </div>
  );
};
