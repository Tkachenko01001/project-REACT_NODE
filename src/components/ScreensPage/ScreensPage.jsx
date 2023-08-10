import HeaderDashboard from '../HeaderDashboard/HeaderDashboard';
import MainDashboard from '../MainDashboard/MainDashboard';
import css from './ScreensPage.module.css';

const ScreensPage = () => {
  return (
    <div
      className={        
        // (theme === 'dark' && css.dark) ||
        // (theme === 'light' && css.light) ||
        // (theme === 'violet' && css.violet) ||
        css.dark
      }>
    <section className={css.headerDashboardSection}>
      <HeaderDashboard />
      <MainDashboard />
    </section>
    </div>
  );
};

export default ScreensPage;
