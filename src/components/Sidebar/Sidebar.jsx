import css from '../Sidebar/Sidebar.module.css';
import sprite from '../../images/sprite.svg';
import { logOut } from 'redux/auth/operations';
import { useDispatch, useSelector } from 'react-redux';
import { selectBoardsList } from 'redux/boards/selectors';
import NewBoardButton from 'components/NewBoardButton/NewBoardButton';
import EditBoard from 'components/EditBoard/EditBoard';
import { NeedHelp } from 'components/NeedHelp/NeedHelp';
import { useEffect } from 'react';
import { getAllBoards } from 'redux/boards/operations';
import { selectTheme } from 'redux/auth/selectors';
import DeleteBoard from 'components/DeleteBoard/DeleteBoard';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const dispatch = useDispatch();
  const allBoards = useSelector(selectBoardsList);
  const theme = useSelector(selectTheme);

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
              {theme === 'violet' ? (
                <use href={sprite + '#icon-icon-violet'}></use>
              ) : (
                <use href={sprite + '#icon-icon-dark'}></use>
              )}
            </svg>
            <h2 className={css.sidebarBoxTitle}>Task Pro</h2>
          </section>
          <div className={css.sidebarItem}>
            <p className={css.sidebarItemTitle}>My boards</p>
          </div>
          <section className={css.sidebarBoard}>
            <p className={css.sidebarBoardItem}>Create a new board</p>
            <NewBoardButton />
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
                  <Link
                    to={`/home/${board._id}`}
                    className={css.sidebarNewBoardItem}
                  >
                    {board.title}
                  </Link>
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
          <div className={css.sidebarHelp}>
            <NeedHelp />
          </div>
          <section className={css.sidebarLogout}>
            <button
              onClick={handleClickLogout}
              className={css.sidebarLogoutButton}
              type="button"
            >
              <svg
                className={
                  theme === 'violet'
                    ? css.sidebarLogoutIconWhite
                    : css.sidebarLogoutIconGreen
                }
                width={32}
                height={32}
              >
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
