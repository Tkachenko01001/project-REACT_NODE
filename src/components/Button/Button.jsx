import { useSelector } from 'react-redux';
import ClipLoader from 'react-spinners/ClipLoader';
import { selectTheme } from 'redux/auth/selectors';
import sprite from '../../images/sprite.svg';
import styles from './Button.module.css';

const Button = ({ icon, text, onClick, loading }) => {
  const theme = useSelector(selectTheme);
  return (
    <button
      className={theme === 'violet' ? styles.buttonViolet : styles.button}
      type="submit"
      onClick={onClick}
    >
      {loading ? (
        <ClipLoader color="#1f1f1f" size={30} />
      ) : (
        icon && (
          <svg width={28} height={28} aria-label="plus">
            <title>Plus Icon</title>
            <use href={sprite + '#icon-plus'} />
          </svg>
        )
      )}

      <span>{text}</span>
    </button>
  );
};

export default Button;
