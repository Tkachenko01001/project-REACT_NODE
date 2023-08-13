import ClipLoader from 'react-spinners/ClipLoader';
import sprite from '../../images/sprite.svg';
import styles from './Button.module.css';
//  Приклад додавання кнопки <Button icon="true" text="Add column" />
const Button = ({ icon, text, onClick, loading }) => {
  return (
    <button className={styles.button} type="submit" onClick={onClick}>
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
