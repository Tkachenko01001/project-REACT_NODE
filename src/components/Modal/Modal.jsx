import css from './Modal.module.css';
import { useEffect } from 'react';
import sprite from '../../images/sprite.svg';

export default function Modal({ onClose, children }) {
  const handleOverlayClick = event => {
    if (event.currentTarget === event.target) {
      onClose();
    }
  };
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return (
    <div
      className={        
        // (theme === 'dark' && css.dark) ||
        // (theme === 'light' && css.light) ||
        // (theme === 'violet' && css.violet) ||
        css.dark
      }
    >
      <div className={css.overlay} onClick={handleOverlayClick}>
        <div className={css.modal}>
          <>
            <button
              type="button"
              className={css.close_Button}
              onClick={onClose}
            >
              <svg width={18} height={18} aria-label="close">
                <use href={sprite + '#icon-x-close'} />
              </svg>
            </button>
            {children}
          </>
        </div>
      </div>
    </div>
  );
}
