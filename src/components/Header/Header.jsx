import css from './Header.module.css';

import Avatar from 'components/Avatar';
import Icon from 'components/Icon';

const Header = () => {
  return (
    <>
      <div className={css.headerall}>
        <div className={css.menuburger}>
          <button className={css.burgerstyle}>
            <Icon
              className={css.burgerMenu}
              name="#menu-icon"
              width="32px"
              height="32px"
            />
          </button>
        </div>

        <div className={css.headerTaskPro}>
          <div className={css.outputselector}>
            <button className={css.styleTheme}>
              <span className={css.spantheme}>Theme</span>
              <Icon
                name="#icon-chevron-down"
                width="16px"
                height="16px"
                color="#ffffff"
              />
            </button>
          </div>

          <ul className={css.styleUserInfo}>
            <li className={css.styleName}>{user.name}</li>
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
