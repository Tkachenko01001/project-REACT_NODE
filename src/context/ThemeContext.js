import React, { createContext, useState } from 'react';
import { useDispatch } from 'react-redux';
import { selectTheme } from 'redux/auth/selectors';

const ThemeContext = createContext(false);

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(useDispatch(selectTheme) || 'dark');

  const checkTheme = () => {
    if (theme === 'light') {
      setTheme('dark');      
    }
    if (theme === 'dark') {
      setTheme('light');      
    }
  };

  return <ThemeContext.Provider value={{ theme, checkTheme }}>{children}</ThemeContext.Provider>;
};

export { ThemeContext, ThemeProvider };

// import { selectTheme } from 'redux/auth/selectors';
// console.log(useSelector(selectTheme));