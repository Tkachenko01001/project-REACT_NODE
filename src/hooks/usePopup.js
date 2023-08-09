import { createContext, useContext, useState, useEffect } from 'react';

import Popup from 'components/Popup/Popup';

const PopupContext = createContext();

export const usePopup = () => useContext(PopupContext);

export const PopupProvider = ({ children }) => {
  const [showPopup, setShowPopup] = useState(false);

  const [popupContent, setPopupContent] = useState(null);

  // const [lastClick, setLastClick] = useState({});

  // const setClickPosition = e => {
  //   const { x, y } = e;
  //   setLastClick({ x, y });
  // };

  // const getPosition = modalHeight => {
  //   const { x = 0, y = 0 } = lastClick;
  //   const pos = {};
  //   const h = window.innerHeight;
  //   if (x > window.innerWidth / 2) pos.right = window.innerWidth - x;
  //   else pos.left = x;
  //   if (y > h / 2) pos.bottom = h - y + Math.min(0, y - modalHeight);
  //   else pos.top = y - Math.max(0, modalHeight - (h - y));
  //   return pos;
  // };

  const getPopup = insert => {
    setPopupContent(insert);
    setShowPopup(true);
  };

  const closePopup = () => {
    setPopupContent(null);
    setShowPopup(false);
  };
  // useEffect(() => {
  //   // window.addEventListener('click', setClickPosition);
  //   return () => window.removeEventListener('click', setClickPosition);
  // }, []);

  return (
    <PopupContext.Provider value={{ getPopup, closePopup }}>
      {showPopup && <Popup onClose={closePopup}>{popupContent}</Popup>}
      {children}
    </PopupContext.Provider>
  );
};
