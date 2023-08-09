import css from './Header.module.css';

import { useSelector } from 'react-redux';
import { selectUser } from 'redux/auth/selectors';

import { usePopup } from 'hooks/usePopup';
import ThemeSelector from 'components/ThemeSelector/ThemeSelector';
import Avatar from 'components/Avatar/Avatar';
import Icon from 'components/Icon/Icon';

const Header = () => {
  const user = useSelector(selectUser);

  const { getPopup, closePopup } = usePopup();

  return (
    
      <div className={css.header}>
        <div className={css.burgerMenu}>
          <button className={css.burgerStyle}>
            <Icon
              className={css.burgerIcon}
              name="#menu-icon"
              width="32px"
              height="32px"
            />
          </button>
        </div>

        <div className={css.headerSelect}>
          <div
            className={css.selectorTheme}
            onClick={() => getPopup(<ThemeSelector onClose={closePopup} />)}
          >
            <button className={css.styleTheme}>
              <span>Theme</span>
              <Icon name="#icon-chevron-down" width="16px" height="16px" />
            </button>
          </div>

          <ul className={css.userInfo}>
            <li className={css.styleName}>{user.name}</li>
            <li>
              <Avatar size={32} />
            </li>
          </ul>
        </div>
      </div>
    
  );
};

export default Header;
