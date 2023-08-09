import { createContext, useContext, useState, useEffect } from 'react';

import Popup from 'components/Popup/Popup';

const PopupContext = createContext();

export const usePopup = () => useContext(PopupContext);

export const PopupProvider = ({ children }) => {
  //   const [showModal, setShowModal] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  //   const [content, setContent] = useState(null);
  const [popupContent, setPopupContent] = useState(null);
  //   const [title, setTitle] = useState('');
  const [lastClick, setLastClick] = useState({});

  const setClickPosition = e => {
    const { x, y } = e;
    setLastClick({ x, y });
  };

  const getPosition = modalHeight => {
    const { x = 0, y = 0 } = lastClick;
    const pos = {};
    const h = window.innerHeight;
    if (x > window.innerWidth / 2) pos.right = window.innerWidth - x;
    else pos.left = x;
    if (y > h / 2) pos.bottom = h - y + Math.min(0, y - modalHeight);
    else pos.top = y - Math.max(0, modalHeight - (h - y));
    return pos;
  };

  //   const getModal = (title, insert) => {
  //     setTitle(title);
  //     setContent(insert);
  //     setShowModal(true);
  //   };
  const getPopup = insert => {
    setPopupContent(insert);
    setShowPopup(true);
  };
  //   const killModal = () => {
  //     setContent(null);
  //     setShowModal(false);
  //   };
  const closePopup = () => {
    setPopupContent(null);
    setShowPopup(false);
  };
  useEffect(() => {
    window.addEventListener('click', setClickPosition);
    return () => window.removeEventListener('click', setClickPosition);
  }, []);

  return (
    <PopupContext.Provider value={{ getPopup, closePopup }}>
      {/* {showModal && (
        <Modal onClose={killModal} name={title} position={getPosition(545)}>
          {content}
        </Modal>
      )} */}
      {showPopup && (
        <Popup onClose={closePopup} position={getPosition(5)}>
          {popupContent}
        </Popup>
      )}
      {children}
    </PopupContext.Provider>
  );
};
