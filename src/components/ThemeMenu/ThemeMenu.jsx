import React, { useEffect, useState, useContext } from 'react';
// import { useDispatch } from 'react-redux';
import css from './ThemeMenu.module.css';
import Icon from 'components/Icon/Icon';
// import { ThemeContext } from '../../context/ThemeContext';
import { useSelector } from 'react-redux';
import { selectUser } from 'redux/auth/selectors';

export const ThemeMenu = () => {
  // const { theme, checkTheme } = useContext(ThemeContext);
  const [themeOption, setThemeOption] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const theme = useSelector(selectUser).theme;

  // const dispatch = useDispatch();

  const handleThemeChange = event => {
    event.stopPropagation();
    setThemeOption(event.target.innerText);
    setIsOpen(false);
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
        // css.light
        // css.violet
        // (theme === 'dark' && css.dark) ||
        // (theme === 'light' && css.light) ||
        // (theme === 'violet' && css.violet) ||
        css.dark
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
