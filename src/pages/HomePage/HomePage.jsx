import css from '../HomePage/HomePage.module.css';
import Sidebar from 'components/Sidebar/Sidebar';
// import SidebarActive from 'components/SidebarActive/SidebarActive';
import ScreensPage from 'components/ScreensPage/ScreensPage';
import Header from 'components/Header/Header';

export default function HomePage({ active, setActive }) {
  return (
    <div className={css.home}>
      <Sidebar />
      {/* <SidebarActive /> */}
      <div
        onClick={() => {
          console.log(setActive);
          setActive(false);
        }}
        className={css.homeWrap}
      >
        <Header />
        <ScreensPage />
      </div>
    </div>
  );
}
