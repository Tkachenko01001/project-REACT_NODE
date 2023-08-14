import css from '../HomePage/HomePage.module.css';

import { useSelector } from 'react-redux';
import { selectUser } from 'redux/auth/selectors';
import Header from 'components/Header/Header';
import Sidebar from 'components/Sidebar/Sidebar';
import ScreensPage from 'components/ScreensPage/ScreensPage';
import { PopupProvider } from 'hooks/usePopup';

export default function HomePage() {
  const user = useSelector(selectUser);

  return (
    <div className={css.home} data-theme={user.theme}>
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
