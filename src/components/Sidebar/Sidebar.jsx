import DeleteBoard from 'components/ModalBoard/DeleteBoard';
import EditBoard from 'components/ModalBoard/EditBoard';
import NewBoard from 'components/ModalBoard/NewBoard';

import { NeedHelp } from 'components/NeedHelp/NeedHelp';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logOut } from 'redux/auth/operations';
import { selectTheme } from 'redux/auth/selectors';
import { getAllBoards } from 'redux/boards/operations';
import { selectBoardsList } from 'redux/boards/selectors';
import sprite from '../../images/sprite.svg';
import css from '../Sidebar/Sidebar.module.css';

const Sidebar = () => {
  const dispatch = useDispatch();
  const allBoards = useSelector(selectBoardsList);
  const theme = useSelector(selectTheme);
  const firstBoard = allBoards[0];
  const activeBoardFirstState = firstBoard ? firstBoard._id : null;
  const [activeBoard, setActiveBoard] = useState(activeBoardFirstState);

  const handleClickBoard = boardId => {
    setActiveBoard(boardId);
  };
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
        <div className={css.flexMarkup}>
          <div className={css.partTop}>
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
          </div>

          <section className={css.sectionBoards}>
            {allBoards.length !== 0 && (
              <div className={css.sidebarListBoard}>
                {allBoards.map(board => (
                  <Link
                    to={`/home/${board._id}`}
                    key={board._id}
                    className={css.sideBarBoardHover}
                  >
                    <div
                      className={`${css.sidebarNewBoard} ${
                        activeBoard === board._id ? css.activeBoard : ''
                      }`}
                      onClick={() => handleClickBoard(board._id)}
                    >
                      <div className={css.sidebarNewBoardItem}>
                        <div className={css.flex}>
                          <svg
                            className={`${css.sidebarNewBoardSvg} ${
                              activeBoard === board._id
                                ? css.sidebarNewBoardSvgActive
                                : ''
                            }`}
                          >
                            <use href={sprite + `#${board.icon}`} />
                          </svg>
                          <p
                            className={`${css.sidebarNewBoardItem} ${
                              activeBoard === board._id
                                ? css.sidebarNewBoardTextActive
                                : ''
                            }`}
                          >
                            {board.title}
                          </p>
                        </div>
                        <div className={css.flex}>
                          <EditBoard
                            checked={activeBoard === board._id}
                            title={board.title}
                          />
                          <DeleteBoard checked={activeBoard === board._id} />
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </section>
          <div className={css.partButton}>
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
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
