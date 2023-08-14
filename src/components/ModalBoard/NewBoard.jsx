import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectTheme } from 'redux/auth/selectors';
import { addBoard } from 'redux/boards/operations';
import { selectIsBoardsLoading } from 'redux/boards/selectors';
import sprite from '../../images/sprite.svg';
import css from '../Sidebar/Sidebar.module.css';
import ModalBoard from './ModalBoard';

const NewBoard = () => {
  const isBoardsLoading = useSelector(selectIsBoardsLoading);
  const required = true;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => setIsModalOpen(state => !state);
  const [icon, setIcon] = useState('icon-project');
  const [background, setBackground] = useState('null');
  const theme = useSelector(selectTheme);

  const dispatch = useDispatch();

  const handleSubmit = event => {
    event.preventDefault();
    dispatch(
      addBoard({
        title: event.target[0].value,
        icon,
        background,
      })
    ).then(() => {
      if (!isBoardsLoading) {
        toggleModal();
        setIcon('icon-project');
        setBackground('null');
      }
    });
  };

  const changeIcon = event => {
    setIcon(event.target.value);
  };
  const changeBg = event => {
    setBackground(event.target.value);
  };

  const modalProps = {
    isModalOpen,
    toggleModal,
    handleSubmit,
    changeBg,
    changeIcon,
    icon,
    background,
    required,
  };

  return (
    <div
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
        <svg
          className={
            theme === 'violet'
              ? css.sidebarBoardIconViolet
              : css.sidebarBoardIconGreen
          }
          width={36}
          height={36}
        >
          <use href={sprite + '#icon-plus'}></use>
        </svg>
      </button>

      <ModalBoard
        {...modalProps}
        modalTitle="New board"
        submitButtonText="Create"
      />
    </div>
  );
};

export default NewBoard;
