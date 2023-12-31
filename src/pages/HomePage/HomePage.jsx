import Header from 'components/Header/Header';
import ScreensPage from 'components/ScreensPage/ScreensPage';
import Sidebar from 'components/Sidebar/Sidebar';
import { useEffect, useState } from 'react';
import css from './HomePage.module.css';

export default function HomePage() {
  const [menuActive, setMenuActive] = useState(false);

  const handleClick = () => {
    setMenuActive(true);
  };

  const handleOverlayClick = event => {
    if (event.target.localName === 'svg' || event.target.localName === 'use')
      return;
    const tags = [
      'section',
      'picture',
      'p',
      'h1',
      'h2',
      'img',
      'button',
      'input',
      'textarea',
    ];

    if (tags.includes(event.target.localName)) return;
    if (
      event.target.getAttribute('aria-label') === 'Open Help Modal for TaskPro'
    )
      return;

    if (event) {
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
        <ScreensPage />
      </div>
    </div>
  );
}
