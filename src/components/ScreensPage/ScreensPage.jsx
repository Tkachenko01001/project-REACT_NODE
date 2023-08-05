// import HeaderDashboard from '../HeaderDashboard/HeaderDashboard';
// import MainDashboard from '../MainDashboard/MainDashboard';
import styles from './ScreensPage.module.css';

import Card from 'components/Card/Card';

const ScreensPage = () => {
  return (
    <section className={styles.headerDashboardSection}>
      {/* <HeaderDashboard />
      <MainDashboard /> */}
      <Card/>
    </section>
  );
};

export default ScreensPage;
