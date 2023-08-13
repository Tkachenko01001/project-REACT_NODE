import css from './Header.module.css';
import Icon from 'components/Icon/Icon';
import { ThemeMenu } from 'components/ThemeMenu/ThemeMenu';
import { EditUserProfile } from 'components/EditUserProfile/EditUserProfile';
import { selectUser } from 'redux/auth/selectors';
import { selectTheme } from 'redux/auth/selectors';
import { useSelector } from 'react-redux';

const Header = ({ click }) => {
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
          <button
            onClick={click}
            className={
              theme === 'violet' ? css.burgerStyleViolet : css.burgerStyle
            }
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
              <EditUserProfile />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
