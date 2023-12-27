import NewBoard from 'components/NewBoard/NewBoard';
import { useState } from 'react';
import sprite from '../../assets/svg/sprite.svg';
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
