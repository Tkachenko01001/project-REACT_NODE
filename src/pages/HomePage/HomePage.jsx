import MainDashboard from 'components/MainDashboard/MainDashboard';
import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';

const HomePage = () => {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <MainDashboard>
        <Outlet />
      </MainDashboard>
    </Suspense>
  );
};

export default HomePage;
