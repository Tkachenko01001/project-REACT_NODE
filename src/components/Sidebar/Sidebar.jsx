import DeleteBoard from 'components/DeleteBoard/DeleteBoard';
import EditBoard from 'components/EditBoard/EditBoard';
import NewBoard from 'components/NewBoard/NewBoard';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from 'redux/auth/operations';
import { getAllBoards } from 'redux/boards/operations';
import { selectBoardsList } from 'redux/boards/selectors';
import cactus from '../../images/cactus.png';
import cactus2x from '../../images/cactus@2x.png';
import cactus3x from '../../images/cactus@3x.png';
import sprite from '../../images/sprite.svg';
import css from '../Sidebar/Sidebar.module.css';

const Sidebar = () => {
  const dispatch = useDispatch();
  const allBoards = useSelector(selectBoardsList);

  useEffect(() => {
    dispatch(getAllBoards());
  }, [dispatch]);

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
          </section>
          {allBoards && (
            <ul className={css.sidebarNewBoard}>
              {allBoards.map(board => (
                <li
                  className={`${css.sidebarNewBoardList} ${css.sidebarNewBoardItem}`}
                  key={board._id}
                >
                  <svg className={css.sidebarNewBoardSvg}>
                    <use href={sprite + `#${board.icon}`} />
                  </svg>
                  <p className={css.sidebarNewBoardItem}>{board.title}</p>
                  <EditBoard
                    id={board._id}
                    title={board.title}
                    icon={board.icon}
                    background={board.background}
                  />
                  <DeleteBoard id={board._id} columns={board.columnOrder} />
                </li>
              ))}
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
