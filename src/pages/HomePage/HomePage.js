import css from '../HomePage/HomePage.module.css';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from 'redux/auth/selectors';
import Header from 'components/Header/Header';
import Sidebar from 'components/Sidebar/Sidebar';
import ScreensPage from 'components/ScreensPage/ScreensPage';
import { PopupProvider } from 'hooks/usePopup';

export default function HomePage() {
  const [isSidebar, setIsSidebar] = useState(false);
  const user = useSelector(selectUser);

  return (
    <div className={css.home} data-theme={user.theme}>
      <PopupProvider>
        <div className={isSidebar ? css.sidebar : css.hidden}>
          <Sidebar />
        </div>

        <div className={css.homeWrap}>
          <div className={css.headerBox}>
            {isSidebar && (
              <div
                className={css.backdrop}
                onClick={() => setIsSidebar(false)}
              ></div>
            )}
            <Header toggleSidebar={setIsSidebar} />
          </div>
          <ScreensPage />
        </div>
      </PopupProvider>
    </div>
  );
}
