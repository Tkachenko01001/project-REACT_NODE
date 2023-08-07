import styles from '../Layout/Layout.module.css';
import Sidebar from 'components/Sidebar/Sidebar';

import { Outlet } from 'react-router';

const Layout = () => {
  return (
    <div className={styles.homeWrapper}>
      <Sidebar />
      <div className={styles.layoutWrapper}>
        <div className={styles.headerBox}>Header</div>
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
