import css from './Header.module.css';

import { useSelector } from 'react-redux';
import { selectUser } from 'redux/auth/selectors';

import Icon from 'components/Icon/Icon';
import { ThemeMenu } from 'components/ThemeMenu/ThemeMenu';
import { EditUserProfile } from 'components/EditUserProfile/EditUserProfile';
import { selectTheme } from 'redux/auth/selectors';


const Header = () => {
  const user = useSelector(selectUser);
  const theme = useSelector(selectTheme);


  return (
    <div
      className={
        (theme === 'dark' && css.dark) ||
        (theme === 'light' && css.light) ||
        (theme === 'violet' && css.violet)
      }
    >
      <div className={css.header}>
        <div className={css.burgerMenu}>
          <button className={css.burgerStyle}>
            <Icon
              className={css.burgerIcon}
              name="#icon-menu"
              width="32px"
              height="32px"
            />
          </button>
        </div>
        <div className={css.headerSelect}>
          <ThemeMenu />
          <ul className={css.userInfo}>
            <li className={css.styleName}>{user.name}</li>
            <li>
              <EditUserProfile />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
