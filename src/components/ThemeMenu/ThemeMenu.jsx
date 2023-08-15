import Icon from 'components/Icon/Icon';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeTheme } from 'redux/auth/operations';
import { selectTheme } from 'redux/auth/selectors';
import css from './ThemeMenu.module.css';

export const ThemeMenu = () => {
  const [themeOption, setThemeOption] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const theme = useSelector(selectTheme);

  const dispatch = useDispatch();

  const handleThemeChange = event => {
    event.stopPropagation();
    setThemeOption(event.target.innerText);
    setIsOpen(false);
    dispatch(changeTheme({ theme: event.target.innerText.toLowerCase() }));
  };

  const handleClick = event => {
    event.stopPropagation();
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const closeMenuOnClickOutside = () => {
      setIsOpen(false);
    };

    window.addEventListener('click', closeMenuOnClickOutside);

    return () => {
      window.removeEventListener('click', closeMenuOnClickOutside);
    };
  }, []);

  return (
    <div
      className={
        (theme === 'dark' && css.dark) ||
        (theme === 'light' && css.light) ||
        (theme === 'violet' && css.violet)
      }
    >
      <div className={css.themeWrapper}>
        <button
          className={
            theme === 'violet' ? css.themeButtonViolet : css.themeButtonGreen
          }
          onClick={handleClick}
        >
          {themeOption === '' ? 'Theme' : themeOption}
          <Icon name="#icon-chevron-down" width="16px" height="16px" />
        </button>
        <div
          className={isOpen ? css.themeMenuOpen : css.themeMenu}
          onClick={e => e.stopPropagation()}
        >
          <ul>
            <li
              className={
                theme === 'violet' ? css.themeItemViolet : css.themeItemGreen
              }
              onClick={handleThemeChange}
            >
              Light
            </li>
            <li
              className={
                theme === 'violet' ? css.themeItemViolet : css.themeItemGreen
              }
              onClick={handleThemeChange}
            >
              Dark
            </li>
            <li
              className={
                theme === 'violet' ? css.themeItemViolet : css.themeItemGreen
              }
              onClick={handleThemeChange}
            >
              Violet
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
