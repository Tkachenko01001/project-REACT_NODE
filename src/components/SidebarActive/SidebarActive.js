import css from '../SidebarActive/SidebarActive.module.css';
import sprite from '../../images/sprite.svg';
import cactus from '../../images/cactus.png';
import cactus2x from '../../images/cactus@2x.png';
import cactus3x from '../../images/cactus@3x.png';
import { logOut } from 'redux/auth/operations';
import { useDispatch } from 'react-redux';

import NewBoard from 'components/NewBoard/NewBoard';
import EditBoard from 'components/EditBoard/EditBoard';

const SidebarActive = ({ boards}) => {
  const dispatch = useDispatch();

  const handleClickBoard = () => {
    console.log('Click');
  };

  const handleClickHelp = () => {
    console.log('click');
  };

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
            <button
              onClick={handleClickBoard}
              className={css.sidebarBoardButton}
              type="button"
            >
              <svg className={css.sidebarBoardIcon}>
                <use href={sprite + '#icon-plus'}></use>
              </svg>
            </button>
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
              <p className={css.sidebarHelpBoxItem}>
                If you need help with{' '}
                <a className={css.sidebarHelpBoxLink} href="/#">
                  TaskPro
                </a>
                , check out our support resources or reach out to our customer
                support team.
              </p>
            </div>
            <button onClick={handleClickHelp} className={css.sidebarHelpbutton}>
              <svg className={css.sidebarHelpIcon}>
                <use href={sprite + '#icon-help-circle'}></use>
              </svg>
              <p className={css.sidebarHelpNeedHelp}>Need help?</p>
            </button>
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

export default SidebarActive;
