import sprite from '../../../assets/svg/sprite.svg';
import styles from './EyeOpen.module.css';

export const EyeOpen = () => {
  return (
    <>
      <svg className={styles.svg}>
        <use href={sprite + '#icon-eye'} />
      </svg>
    </>
  );
};
