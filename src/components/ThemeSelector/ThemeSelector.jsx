import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

import { changeTheme } from 'redux/auth/operations';
import { selectUser } from 'redux/auth/selectors';

import css from './ThemeSelector.modul.css';

const ThemeSelector = ({ onClose }) => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const themes = {
    dark: 'dark',
    light: 'light',
    violet: 'violet',
  };

  const getThemeOptions = () => {
    let list = [];
    for (const option in themes) {
      const item = themes[option];

      list.push(
        <li key={item}>
          <button
            onClick={() => {
              dispatch(changeTheme(item));
              onClose();
            }}
            className={`${
              user.theme === item ? css.active : css.selectorItem
            } noselect`}
          >
            {item}
          </button>
        </li>
      );
    }
    return list;
  };
  return <ul className={css.selector}>{getThemeOptions()}</ul>;
};

export default ThemeSelector;
