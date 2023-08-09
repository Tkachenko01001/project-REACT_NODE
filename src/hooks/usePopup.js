import { createContext, useContext, useState } from 'react';

import Popup from 'components/Popup/Popup';

const PopupContext = createContext();

export const usePopup = () => useContext(PopupContext);

export const PopupProvider = ({ children }) => {
  const [showPopup, setShowPopup] = useState(false);

  const [popupContent, setPopupContent] = useState(null);

  const getPopup = insert => {
    setPopupContent(insert);
    setShowPopup(true);
  };

  const closePopup = () => {
    setPopupContent(null);
    setShowPopup(false);
  };

  return (
    <PopupContext.Provider value={{ getPopup, closePopup }}>
      {showPopup && <Popup onClose={closePopup}>{popupContent}</Popup>}
      {children}
    </PopupContext.Provider>
  );
};
