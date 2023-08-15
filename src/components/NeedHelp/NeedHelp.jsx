import sprite from '../../images/sprite.svg';
import cactus from '../../images/cactus.png';
import cactus2x from '../../images/cactus@2x.png';
import cactus3x from '../../images/cactus@3x.png';
import css from './NeedHelp.module.css';
import { useSelector } from 'react-redux';
import { selectTheme } from 'redux/auth/selectors';
import { HelpForm } from 'components/Help/HelpForm/Help';

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
