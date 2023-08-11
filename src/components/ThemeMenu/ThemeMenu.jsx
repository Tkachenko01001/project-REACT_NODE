import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import css from './ThemeMenu.module.css';
import Icon from 'components/Icon/Icon';
import { useSelector } from 'react-redux';
import { selectTheme } from 'redux/auth/selectors';
import { changeTheme } from 'redux/auth/operations';

export const ThemeMenu = () => {
  const [themeOption, setThemeOption] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState(useSelector(selectTheme));

  const dispatch = useDispatch();

  const handleThemeChange = event => {
    event.stopPropagation();
    setThemeOption(event.target.innerText);
    setIsOpen(false);
    dispatch(changeTheme({ theme: event.target.innerText.toLowerCase() }));
    setTheme(event.target.innerText.toLowCase);
  };

  const handleClick = event => {
    event.stopPropagation();
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const closeMenuOnClickOutside = event => {
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
        <button className={css.themeButton} onClick={handleClick}>
          {themeOption === '' ? 'Theme' : themeOption}
          <Icon name="#icon-chevron-down" width="16px" height="16px" />
        </button>
        <div
          className={isOpen ? css.themeMenuOpen : css.themeMenu}
          onClick={e => e.stopPropagation()}
        >
          <ul>
            <li className={css.themeItem} onClick={handleThemeChange}>
              Light
            </li>
            <li className={css.themeItem} onClick={handleThemeChange}>
              Dark
            </li>
            <li className={css.themeItem} onClick={handleThemeChange}>
              Violet
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
