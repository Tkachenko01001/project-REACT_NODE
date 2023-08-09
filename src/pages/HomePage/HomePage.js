import css from '../HomePage/HomePage.module.css';
import Header from 'components/Header/Header';
import Sidebar from 'components/Sidebar/Sidebar';
import ScreensPage from 'components/ScreensPage/ScreensPage';
import { PopupProvider } from 'hooks/usePopup';

export default function HomePage() {
  return (
    <div className={css.home}>
      <Sidebar />
      <div className={css.homeWrap}>
        <PopupProvider>
          <div className={css.headerBox}>
            <Header />
          </div>
        </PopupProvider>
        <ScreensPage />
      </div>
    </div>
  );
}
