import ModalPortal from 'components/Modal/ModalPortal';
import { useSelector } from 'react-redux';
import { selectTheme } from 'redux/auth/selectors';
import styles from './Help.module.css';

export const ModalMessage = ({ toggleModal, title, message }) => {
  const theme = useSelector(selectTheme);
  return (
    <ModalPortal>
      <h2 className={styles.title}>{title}</h2>
      <p>{message}</p>
      <button
        className={theme === 'violet' ? styles.btnViolet : styles.btn}
        type="button"
        onClick={toggleModal}
      >
        Ok
      </button>
    </ModalPortal>
  );
};
