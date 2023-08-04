import css from '../Sidebar/Sidebar.module.css';
import sprite from '../../images/sprite.svg';
import cactus from '../../images/cactus.png';
import cactus2x from '../../images/cactus@2x.png';
import cactus3x from '../../images/cactus@3x.png';

const Sidebar = ({ boards }) => {
  const handleClickButton = () => {
    console.log('Click');
  };

  return (
    <div>
      <div className={css.container}>
        <aside className={css.sidebar}>
          <div className={css.sidebarBox}>
            <svg className={css.sidebarBoxIcon}>
              <use href={sprite + '#icon-icon-dark'}></use>
            </svg>
            <h2 className={css.sidebarBoxTitle}>Task Pro</h2>
          </div>
          <div className={css.sidebarItem}>
            <p className={css.sidebarItemTitle}>My boards</p>
          </div>
          <div className={css.sidebarBoard}>
            <p className={css.sidebarBoardItem}>Create a new board</p>
            <button
              onClick={handleClickButton}
              className={css.sidebarBoardButton}
              type="button"
            >
              <svg className={css.sidebarBoardIcon}>
                <use href={sprite + '#icon-plus'}></use>
              </svg>
            </button>
          </div>
          <ul className={css.sidebarNewBoard}>
            <li className={css.sidebarNewBoardList}>
              <svg className={css.sidebarNewBoardSvg}>
                <use href={sprite + '#icon-project'}></use>
              </svg>
              <p className={css.sidebarNewBoardItem}>Project office</p>
              <button className={css.sidebarNewBoardButton} type="button">
                <svg className={css.sidebarNewBoardIcon}>
                  <use href={sprite + '#icon-pencil'}></use>
                </svg>
              </button>
              <button
                className={css.sidebarNewBoardButtonCurrent}
                type="button"
              >
                <svg className={css.sidebarNewBoardIcon}>
                  <use href={sprite + '#icon-trash'}></use>
                </svg>
              </button>
            </li>
          </ul>
          <div>
            <picture>
              <source srcSet={(cactus, cactus2x, cactus3x)} type="image/png" />
            </picture>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Sidebar;
