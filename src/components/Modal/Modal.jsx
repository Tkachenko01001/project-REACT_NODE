import css from './Modal.module.css';
import { useEffect } from 'react';
import sprite from '../../images/sprite.svg';
import { useSelector } from 'react-redux';
import { selectTheme } from 'redux/auth/selectors';

export default function Modal({ onClose, children }) {
  const theme = useSelector(selectTheme);

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
    <div className={css.overlay} onClick={handleOverlayClick}>
      <div
        className={
          (theme === 'dark' && css.dark) ||
          (theme === 'light' && css.light) ||
          (theme === 'violet' && css.violet)
        }
      >
        <div className={theme === 'dark' ? css.modalDark : css.modal}>
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
