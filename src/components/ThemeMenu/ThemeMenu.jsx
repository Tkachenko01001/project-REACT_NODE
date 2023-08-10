import React, { useEffect, useState } from 'react';
import css from './ThemeMenu.module.css';
import Icon from 'components/Icon/Icon';

export const ThemeMenu = () => {
  const [theme, setTheme] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const handleThemeChange = event => {
    event.stopPropagation();
    setTheme(event.target.innerText);
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
    <div className={css.themeWrapper}>
      <button className={css.themeButton} onClick={handleClick}>
        {theme === '' ? 'Theme' : theme}
        <Icon name="#icon-chevron-down" width="16px" height="16px" />
      </button>
      <div className={isOpen ? css.themeMenuOpen : css.themeMenu} isOpen={isOpen} onClick={e => e.stopPropagation()}>
        <ul>
          <li className={css.themeItem} onClick={handleThemeChange}>Light</li>
          <li className={css.themeItem} onClick={handleThemeChange}>Dark</li>
          <li className={css.themeItem} onClick={handleThemeChange}>Violet</li>
        </ul>
      </div>
    </div>
  );
};
