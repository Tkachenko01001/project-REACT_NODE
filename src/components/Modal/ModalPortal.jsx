import { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useSelector } from 'react-redux';
import { selectTheme } from 'redux/auth/selectors';
import sprite from '../../images/sprite.svg';
import css from '../Modal/Modal.module.css';

export default function ModalPortal({ onClose, children }) {
  const theme = useSelector(selectTheme);
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

  const handleOverlayClick = event => {
    if (event.currentTarget === event.target) {
      onClose();
    }
  };
  const portalContainerId = 'modal-root';

  const portalContainer = document.getElementById(portalContainerId);
  if (!portalContainer) {
    return null;
  }
  const modalContent = (
    <div
      className={
        (theme === 'dark' && css.dark) ||
        (theme === 'light' && css.light) ||
        (theme === 'violet' && css.violet)
      }
    >
      <div className={css.overlay} onClick={handleOverlayClick}>
        <div className={theme === 'dark' ? css.modalDark : css.modal}>
          <button type="button" className={css.close_Button} onClick={onClose}>
            <svg width={18} height={18} aria-label="close">
              <use href={sprite + '#icon-x-close'} />
            </svg>
          </button>
          {children}
        </div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(modalContent, portalContainer);
}
