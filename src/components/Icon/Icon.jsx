import sprite from '../../images/sprite.svg';
import css from './Icon.module.css';

const Icon = ({ name, tip = null, width = '18px', height = '18px' }) => {
  return (
    <div className={css.icon}>
      <svg width={width} height={height} stroke="currentColor">
        <use href={sprite + name} />
      </svg>
      {tip && <div className={css.tip}>{tip}</div>}
    </div>
  );
};

export default Icon;
