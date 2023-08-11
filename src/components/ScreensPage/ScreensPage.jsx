import HeaderDashboard from '../HeaderDashboard/HeaderDashboard';
import MainDashboard from '../MainDashboard/MainDashboard';
import css from './ScreensPage.module.css';
import { useSelector } from 'react-redux';
import { selectTheme } from 'redux/auth/selectors';
import { selectActiveBoard } from 'redux/boards/selectors';

const ScreensPage = () => {
  const theme = useSelector(selectTheme);
  const activeBoard = useSelector(selectActiveBoard);
  console.log(activeBoard);
  
  return (
    <div
      className={
        (theme === 'dark' && css.dark) ||
        (theme === 'light' && css.light) ||
        (theme === 'violet' && css.violet)
      }
    >
      <section
        className={`${css.headerDashboardSection} 
        ${
          (activeBoard.background === 'flowers' && css.bgFlowers) ||
          (activeBoard.background === 'airBalloon' && css.bgAirBallon) ||
          (activeBoard.background === 'blue' && css.bgBlue) ||
          (activeBoard.background === 'cappadocia' && css.bgCappadocia) ||
          (activeBoard.background === 'gorge' && css.bgGorge) ||
          (activeBoard.background === 'greens' && css.bgGreens) ||
          (activeBoard.background === 'moon' && css.bgMoon) ||
          (activeBoard.background === 'mountains' && css.bgMountains) ||
          (activeBoard.background === 'rocksAndSea' && css.bgRocksAndSea) ||
          (activeBoard.background === 'sea' && css.bgSea) ||
          (activeBoard.background === 'semiMoon' && css.bgSemiMoon) ||
          (activeBoard.background === 'trailer' && css.bgTrailer) ||
          (activeBoard.background === 'tree' && css.bgTree) ||
          (activeBoard.background === 'violetSphere' && css.bgVioletSphere) ||
          (activeBoard.background === 'yacht' && css.bgYacht)
        }`}
      >
        <HeaderDashboard />
        <MainDashboard />
      </section>
    </div>
  );
};

export default ScreensPage;
