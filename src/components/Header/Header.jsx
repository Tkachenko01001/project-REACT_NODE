import css from './Header.module.css';

import { useSelector } from 'react-redux';
import { selectUser } from 'redux/auth/selectors';
import { useState } from 'react';

import Avatar from 'components/Avatar/Avatar';
import Icon from 'components/Icon/Icon';
import { ThemeMenu } from 'components/ThemeMenu/ThemeMenu';
import SidebarActive from 'components/SidebarActive/SidebarActive';

const Header = ({ active, setActive }) => {
  // My fix
  const [menuActive, setMenuActive] = useState(false);
  // My fix
  const user = useSelector(selectUser);

  return (
    <div className={css.header}>
      <div className={css.burgerMenu}>
        <button
          onClick={() => setMenuActive(!menuActive)}
          className={css.burgerStyle}
        >
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
      <SidebarActive active={menuActive} setActive={setMenuActive} />
    </div>
  );
};

export default Header;
