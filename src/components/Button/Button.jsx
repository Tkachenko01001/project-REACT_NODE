import styles from './Button.module.css';
import sprite from '../../images/sprite.svg';
//  Приклад додавання кнопки <Button icon="true" text="Add column" />
const Button = ({ icon, text }) => {
  return (
    <button className={styles.button} type="submit">
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
