import HeaderDashboard from '../HeaderDashboard/HeaderDashboard';
import MainDashboard from '../MainDashboard/MainDashboard';
import styles from './ScreensPage.module.css';

const ScreensPage = () => {
  return (
    <section className={styles.headerDashboardSection}>
      <HeaderDashboard />
      <MainDashboard />
    </section>
  );
};

export default ScreensPage;
