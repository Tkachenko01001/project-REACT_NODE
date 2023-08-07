import HeaderDashboard from '../HeaderDashboard/HeaderDashboard';
import MainDashboard from '../MainDashboard/MainDashboard';
import styles from './ScreensPage.module.css';

import Modal from 'components/Modal/Modal';
import NewBoard from 'components/NewBoard/NewBoard';

const ScreensPage = () => {
  return (
    <section className={styles.headerDashboardSection}>
      <HeaderDashboard />
      <MainDashboard />
      <Modal>
        <NewBoard />
      </Modal>
    </section>
  );
};

export default ScreensPage;
