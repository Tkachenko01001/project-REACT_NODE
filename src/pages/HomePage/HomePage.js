import css from '../HomePage/HomePage.module.css';
import Sidebar from 'components/Sidebar/Sidebar';
import ScreensPage from 'components/ScreensPage/ScreensPage';

export default function HomePage() {
  return (
    <div className={css.home}>
      <Sidebar />
      <div className={css.homeWrap}>
        <div className={css.headerBox}>Header</div>
        <ScreensPage />
      </div>
    </div>
  );
}
