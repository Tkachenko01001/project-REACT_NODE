import css from './HomePage.module.css';
import Sidebar from 'components/Sidebar/Sidebar';
import ScreensPage from 'components/ScreensPage/ScreensPage';
import Header from 'components/Header/Header';
import { useState } from 'react';

export default function HomePage() {
  // My fix
  const [menuActive, setMenuActive] = useState(false);

  const handleClick = () => {
    setMenuActive(true);
  };
  // My fix

  return (
    <div
      className={css.home}
      onClick={() => {
        setMenuActive(false);
      }}
    >
      <Sidebar active={menuActive} />

      <div className={css.homeWrap} onClick={e => e.stopPropagation()} >
        <Header click={handleClick} />
        <ScreensPage />
      </div>
    </div>
  );
}
