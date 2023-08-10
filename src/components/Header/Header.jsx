import css from './Header.module.css';

import { useSelector } from 'react-redux';
import { selectUser } from 'redux/auth/selectors';

import Avatar from 'components/Avatar/Avatar';
import Icon from 'components/Icon/Icon';
import { ThemeMenu } from 'components/ThemeMenu/ThemeMenu';

// import { ThemeContext } from 'context/ThemeContext';
// import { useContext } from 'react';

const Header = () => {
  const user = useSelector(selectUser);
  const theme = useSelector(selectUser).theme;
  console.log(useSelector(selectUser).theme, theme, useSelector(selectUser));
  // const { theme } = useContext(ThemeContext);
  return (    
    <div
      className={        
        (theme === 'dark' && css.dark) ||
        (theme === 'light' && css.light) ||
        (theme === 'violet' && css.violet) ||
        css.dark
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
              <Avatar size={32} />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
