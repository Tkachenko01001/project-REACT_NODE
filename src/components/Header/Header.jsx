import css from './Header.module.css';
import Icon from 'components/Icon/Icon';
import { ThemeMenu } from 'components/ThemeMenu/ThemeMenu';
// import Sidebar from 'components/Sidebar/Sidebar';
import { EditUserProfile } from 'components/EditUserProfile/EditUserProfile';
import { selectUser } from 'redux/auth/selectors';
import { selectTheme } from 'redux/auth/selectors';
import { useSelector } from 'react-redux';

// import { useState } from 'react';

const Header = ({ click }) => {
  // // My fix
  // const [menuActive, setMenuActive] = useState(false);

  // const handleClick = () => {
  //   setMenuActive(true);
  //   console.log(menuActive);
  // };
  // // My fix
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
          <button onClick={click} className={css.burgerStyle}>
            c
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
      {/* <Sidebar active={menuActive} setActive={setMenuActive} /> */}
    </div>
  );
};

export default Header;
