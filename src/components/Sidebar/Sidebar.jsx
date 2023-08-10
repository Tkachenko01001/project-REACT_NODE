import css from '../Sidebar/Sidebar.module.css';
import sprite from '../../images/sprite.svg';
import cactus from '../../images/cactus.png';
import cactus2x from '../../images/cactus@2x.png';
import cactus3x from '../../images/cactus@3x.png';
import { logOut } from 'redux/auth/operations';
import { useDispatch } from 'react-redux';
import { HelpForm } from 'components/Help/HelpForm/Help';
import NewBoard from 'components/NewBoard/NewBoard';
import EditBoard from 'components/EditBoard/EditBoard';

const Sidebar = ({ boards }) => {
  const dispatch = useDispatch();

  const handleClickLogout = () => {
    dispatch(logOut());
  };

  return (
    <div>
      <aside className={css.sidebar}>
        <div>
          <section className={css.sidebarBox}>
            <svg className={css.sidebarBoxIcon}>
              <use href={sprite + '#icon-icon-dark'}></use>
            </svg>
            <h2 className={css.sidebarBoxTitle}>Task Pro</h2>
          </section>
          <div className={css.sidebarItem}>
            <p className={css.sidebarItemTitle}>My boards</p>
          </div>
          <section className={css.sidebarBoard}>
            <p className={css.sidebarBoardItem}>Create a new board</p>
            <NewBoard />
            <EditBoard />
          </section>
          {boards && (
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
          )}
        </div>
        <div>
          <section className={css.sidebarHelp}>
            <div>
              <picture>
                <source
                  srcSet={`${cactus} 1x, ${cactus2x} 2x,${cactus3x} 3x`}
                />
                <img srcSet={`${cactus} 1x`} alt="cactus" />
              </picture>
            </div>
            <div className={css.sidebarHelpBox}>
              <HelpForm />
            </div>
            <div className={css.sidebarHelpWrap}>
              <svg className={css.sidebarHelpIcon}>
                <use href={sprite + '#icon-help-circle'}></use>
              </svg>
              <p className={css.sidebarHelpNeedHelp}>Need help?</p>
            </div>
          </section>
          <section className={css.sidebarLogout}>
            <button
              onClick={handleClickLogout}
              className={css.sidebarLogoutButton}
              type="button"
            >
              <svg className={css.sidebarLogoutIcon} width={32} height={32}>
                <use href={sprite + '#icon-logout'}></use>
              </svg>
              Log out
            </button>
          </section>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
