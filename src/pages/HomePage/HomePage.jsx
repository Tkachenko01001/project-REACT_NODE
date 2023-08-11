import css from './HomePage.module.css';
import Sidebar from 'components/Sidebar/Sidebar';
import ScreensPage from 'components/ScreensPage/ScreensPage';
import Header from 'components/Header/Header';

export default function HomePage() {
  return (
    <div className={css.home}>
      <Sidebar />
      <div className={css.homeWrap}>
        <Header />
        <ScreensPage />
      </div>
    </div>
  );
}
