import Sidebar from 'components/Sidebar/Sidebar';
import { Outlet } from 'react-router';

const Layout = () => {
  return (
    <>
      <Outlet />
      <Sidebar />
    </>
  );
};

export default Layout;
