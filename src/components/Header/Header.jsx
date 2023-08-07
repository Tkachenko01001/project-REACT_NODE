import css from './Header.module.css';

import Avatar from 'components/Avatar';
import Icon from 'components/Icon';

const Header = () => {
  return (
    <>
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

        <div className={css.headerTask}>
          <div className={css.selectorTheme}>
            <button className={css.theme}>
              <span>Theme</span>
              <Icon
                name="#icon-chevron-down"
                width="16px"
                height="16px"
                color="#ffffff"
              />
            </button>
          </div>

          <ul className={css.userInfo}>
            <li className={css.name}>sname</li>
            <li>
              <Avatar size={32} />
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Header;
