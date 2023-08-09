import css from './Popup.module.css';

const Popup = ({ children, onClose, position }) => {
  return (
    <div onClick={onClose}>
      <div
        className={css.popupContent}
        style={{ ...position }}
        onClick={e => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export default Popup;
