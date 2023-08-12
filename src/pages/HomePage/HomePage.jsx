import css from './HomePage.module.css';
import Sidebar from 'components/Sidebar/Sidebar';
import ScreensPage from 'components/ScreensPage/ScreensPage';
import Header from 'components/Header/Header';
import { useState, useEffect } from 'react';

export default function HomePage() {
  const [menuActive, setMenuActive] = useState(false);

  const handleClick = () => {
    setMenuActive(state => !state);
  };

  const handleOverlayClick = event => {
    if (event.currentTarget === event.target) {
      setMenuActive(state => !state);
    }
  };
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        setMenuActive(state => !state);
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

      <div className={css.homeWrap}>
        <Header click={handleClick} />
        <ScreensPage />
      </div>
    </div>
  );
}
