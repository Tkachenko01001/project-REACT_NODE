import css from '../Sidebar/Sidebar.module.css';
import sprite from '../../images/sprite.svg';
import { logOut } from 'redux/auth/operations';
import { useDispatch, useSelector } from 'react-redux';
import { selectBoardsList } from 'redux/boards/selectors';
import NewBoard from 'components/NewBoard/NewBoard';
import EditBoard from 'components/EditBoard/EditBoard';
import { NeedHelp } from 'components/NeedHelp/NeedHelp';
import { useEffect } from 'react';
import { getAllBoards } from 'redux/boards/operations';
import { selectTheme } from 'redux/auth/selectors';

const Sidebar = ({ boards }) => {
  const theme = useSelector(selectTheme);
  const dispatch = useDispatch();
  const allBoards = useSelector(selectBoardsList);

  useEffect(() => {
    dispatch(getAllBoards());
  }, [dispatch]);

  const handleClickLogout = () => {
    dispatch(logOut());
  };

  return (
    <div
      className={
        (theme === 'dark' && css.dark) ||
        (theme === 'light' && css.light) ||
        (theme === 'violet' && css.violet)
      }
    >
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
          {allBoards && (
            <ul className={css.sidebarNewBoard}>
              {allBoards.map(board => (
                <li className={css.sidebarNewBoardList} key={board.id}>
                  <svg className={css.sidebarNewBoardSvg}>
                    <use href={sprite + `#${board.icon}`} />
                  </svg>
                  <p className={css.sidebarNewBoardItem}>{board.title}</p>
                  <button className={css.sidebarNewBoardButton} type="button">
                    <svg className={css.sidebarNewBoardIcon}>
                      <use href={sprite + '#icon-pencil'} />
                    </svg>
                  </button>
                  <button
                    className={css.sidebarNewBoardButtonCurrent}
                    type="button"
                  >
                    <svg className={css.sidebarNewBoardIcon}>
                      <use href={sprite + '#icon-trash'} />
                    </svg>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div>
          <section className={css.sidebarHelp}>
            <NeedHelp />
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
