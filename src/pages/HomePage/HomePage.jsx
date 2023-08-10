import css from './HomePage.module.css';
import Sidebar from 'components/Sidebar/Sidebar';
import ScreensPage from 'components/ScreensPage/ScreensPage';
import Header from 'components/Header/Header';
// import { selectUser } from 'redux/auth/selectors';
// import { ThemeContext } from 'context/ThemeContext';
// import { useContext } from 'react';
// import { useSelector } from 'react-redux';

export default function HomePage() {
  // const theme = useSelector(selectUser).theme;
  // console.log(useSelector(selectUser).theme, theme, useSelector(selectUser));
  // const { theme } = useContext(ThemeContext);
  return (
    // <div className={theme === 'dark' ? css.dark : css.light}>
      <div className={css.home}>
        <Sidebar />
        <div className={css.homeWrap}>
          <Header />
          <ScreensPage />
        </div>
      </div>
    // </div>
  );
}
