import HeaderDashboard from './header-dashboard/headerDashboard';
import MainDashboard from './main-dashboard/mainDashboard';
import styles from './header-dashboard/headerDashboard.module.css';

const ScreensPage = () => {
  return (
    <section className={styles.headerDashboardSection}>
      <HeaderDashboard />
      <MainDashboard />
    </section>
  );
};

export default ScreensPage;