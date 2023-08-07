import sprite from '../../../images/sprite.svg';
import styles from './EyeClose.module.css';

export const EyeClose = () => {
  return (
    <>
      <svg className={styles.svg}>
        <use href={sprite + '#icon-eye-blocked'} />
      </svg>
    </>
  );
};