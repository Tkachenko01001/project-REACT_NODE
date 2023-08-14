import styles from './Button.module.css';
import sprite from '../../images/sprite.svg';
import { useSelector } from 'react-redux';
import { selectTheme } from 'redux/auth/selectors';

//  Приклад додавання кнопки <Button icon="true" text="Add column" />
const Button = ({ icon, text, onClick }) => {
  const theme = useSelector(selectTheme);
  return (
    <button
      className={theme === 'violet' ? styles.buttonViolet : styles.button}
      type="submit"
      onClick={onClick}
    >
      {icon && (
        <svg width={28} height={28} aria-label="plus">
          <title>Plus Icon</title>
          <use href={sprite + '#icon-plus'} />
        </svg>
      )}
      <span>{text}</span>
    </button>
  );
};

export default Button;
