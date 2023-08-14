import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectTheme } from 'redux/auth/selectors';
import { selectActiveBoard } from 'redux/boards/selectors';
import HeaderDashboard from '../HeaderDashboard/HeaderDashboard';
import MainDashboard from '../MainDashboard/MainDashboard';
import css from './ScreensPage.module.css';

const ScreensPage = () => {
  const [activeBg, setActiveBg] = useState('null');

  const theme = useSelector(selectTheme);
  const activeBoard = useSelector(selectActiveBoard);

  useEffect(() => {
    if (activeBoard && activeBoard.background) {
      setActiveBg(activeBoard.background);
    } else {
      setActiveBg('null');
    }
  }, [activeBoard]);

  return (
    <div
      className={
        (theme === 'dark' && css.dark) ||
        (theme === 'light' && css.light) ||
        (theme === 'violet' && css.violet)
      }
    >
      <section>
        <HeaderDashboard />
        <div
          className={`${css.headerDashboardSection} ${
            activeBg &&
            css[`bg${activeBg.charAt(0).toUpperCase() + activeBg.slice(1)}`]
          }`}
        >
          <MainDashboard />
        </div>
      </section>
    </div>
  );
};

export default ScreensPage;
