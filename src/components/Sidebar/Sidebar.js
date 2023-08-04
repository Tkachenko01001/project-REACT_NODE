import css from '../Sidebar/Sidebar.module.css';
import sprite from '../../images/sprite.svg';

const Sidebar = () => {
  return (
    <div>
      <div className={css.container}>
        <div className={css.sidebar}>
          <div className={css.sidebarBox}>
            <svg width={32} height={32}>
              <use href={sprite + '#icon-icon'}></use>
            </svg>
            <h2 className={css.sidebarBoxTitle}>Task Pro</h2>
          </div>
          <p className={css.sidebarItem}>My boards</p>
          <div className={css.sidebarBoard}>
            <h3 className={css.sidebarBoardTitle}>
              Create a<br /> new board
            </h3>
            <button type="button">
              <svg className={css.sidebarBoardSvg} width={20} height={20}>
                <use href={sprite + '#icon-plus1'}></use>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
