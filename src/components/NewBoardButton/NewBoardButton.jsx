import { useState } from 'react';
import NewBoard from 'components/NewBoard/NewBoard';
import sprite from '../../images/sprite.svg';
import css from '../Sidebar/Sidebar.module.css';




const NewBoardButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => setIsModalOpen(state => !state);
   
  return (
    <>
      <button
        onClick={toggleModal}
        className={css.sidebarBoardButton}
        type="button"
      >
        <svg className={css.sidebarBoardIcon}>
          <use href={sprite + '#icon-plus'}></use>
        </svg>
      </button>
      {isModalOpen && <NewBoard toggleModal={toggleModal} />}
    </>
  );
};

export default NewBoardButton;

// import { useSelector } from 'react-redux';
// import { selectTheme } from 'redux/auth/selectors';

// const theme = useSelector(selectTheme);

// const NewBoard = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const toggleModal = () => setIsModalOpen(state => !state);

/* <div
        className={
          (theme === 'dark' && css.dark) ||
          (theme === 'light' && css.light) ||
          (theme === 'violet' && css.violet)
        }
      >

      <button
        onClick={toggleModal}
        className={css.sidebarBoardButton}
        type="button"
      >
        <svg className={theme === 'violet' ? css.sidebarBoardIconViolet : css.sidebarBoardIconGreen}>
          <use href={sprite + '#icon-plus'}></use>
        </svg>
      </button> */