import css from '../HomePage/HomePage.module.css';

import { useSelector } from 'react-redux';
import { selectUser } from 'redux/auth/selectors';
import Header from 'components/Header/Header';
import Sidebar from 'components/Sidebar/Sidebar';
import ScreensPage from 'components/ScreensPage/ScreensPage';
import { PopupProvider } from 'hooks/usePopup';

export default function HomePage() {
<<<<<<< HEAD
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
=======
  const [menuActive, setMenuActive] = useState(false);

  const handleClick = () => {
    setMenuActive(true);
  };

  const handleOverlayClick = event => {
    if (event.target.localName === 'svg' || event.target.localName === 'use')
      return;
    if (event.target) {
      setMenuActive(false);
    }
  };
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        setMenuActive(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  return (
    <div className={css.home} onClick={handleOverlayClick}>
      <Sidebar active={menuActive} />

      <div className={menuActive ? css.homeWrapOverlay : css.homeWrap}>
        <Header click={handleClick} />
>>>>>>> 43caf30cb8f8939f1c808657f8d340b61b0c1f91
        <ScreensPage />
      </div>
    </div>
  );
}
