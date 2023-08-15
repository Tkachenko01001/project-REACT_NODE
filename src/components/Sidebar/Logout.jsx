import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ClipLoader from 'react-spinners/ClipLoader';
import { logOut } from 'redux/auth/operations';
import { selectIsLoggedIn } from 'redux/auth/selectors';
import css from './Sidebar.module.css';
import { selectTheme } from 'redux/auth/selectors';
import { dellActive } from 'redux/boards/slice';
import sprite from '../../images/sprite.svg';
import ModalPortal from '../Modal/ModalPortal';
import styles from '../ModalBoard/ModalBoard.module.css';

const Logout = () => {
  const isLoading = useSelector(selectIsLoggedIn);
  const [startLoading, setStartLoading] = useState(false);

  const dispatch = useDispatch();
  const theme = useSelector(selectTheme);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => setIsModalOpen(state => !state);

  const handleAgreement = () => {
    setStartLoading(true);
    dispatch(dellActive({}));
    dispatch(logOut()).then(() => {
      !isLoading && toggleModal();
    });
  };

  return (
    <div>
      <button
        onClick={toggleModal}
        className={css.sidebarLogoutButton}
        type="button"
      >
        <svg
          className={
            theme === 'violet'
              ? css.sidebarLogoutIconWhite
              : css.sidebarLogoutIconGreen
          }
          width={32}
          height={32}
        >
          <use href={sprite + '#icon-logout'}></use>
        </svg>
        Log out
      </button>
      {isModalOpen && (
        <ModalPortal onClose={toggleModal}>
          <h1 className={styles.title}>Log out</h1>

          <h3 className={styles.text}>
            Are you sure you want to leave account?
          </h3>

          <button
            className={theme === 'violet' ? styles.btnViolet : styles.btn}
            type="button"
            onClick={handleAgreement}
          >
            {startLoading && isLoading && (
              <ClipLoader color="#1f1f1f" size={30} />
            )}
            Yes
          </button>
          <button
            className={theme === 'violet' ? styles.btnViolet : styles.btn}
            type="button"
            onClick={toggleModal}
          >
            No
          </button>
        </ModalPortal>
      )}
    </div>
  );
};

export default Logout;
