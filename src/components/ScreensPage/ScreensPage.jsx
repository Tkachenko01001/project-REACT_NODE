import HeaderDashboard from '../HeaderDashboard/HeaderDashboard';
import MainDashboard from '../MainDashboard/MainDashboard';
import css from './ScreensPage.module.css';
import { useSelector } from 'react-redux';
import { selectTheme } from 'redux/auth/selectors';

const ScreensPage = () => {
  const theme = useSelector(selectTheme);
  return (
    <div
      className={        
        (theme === 'dark' && css.dark) ||
        (theme === 'light' && css.light) ||
        (theme === 'violet' && css.violet)
      }>
    <section className={css.headerDashboardSection}>
      <HeaderDashboard />
      <MainDashboard />
    </section>
    </div>
  );
};

export default ScreensPage;
