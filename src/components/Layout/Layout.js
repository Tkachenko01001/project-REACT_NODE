import css from '../Layout/Layout.module.css';
import Sidebar from 'components/Sidebar/Sidebar';

import { Outlet } from 'react-router';

const Layout = () => {
  return (
    <>
    
      <Sidebar />
      <Outlet />
    </>
  );
};

export default Layout;
