import styles from './Modal.module.css';
import * as React from 'react';
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
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={styles.modal}>
        <>
          <button
            type="button"
            className={styles.close_Button}
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
  );
}
