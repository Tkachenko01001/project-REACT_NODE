import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateBoard } from 'redux/boards/operations';
import { selectIsBoardsLoading } from 'redux/boards/selectors';
import sprite from '../../images/sprite.svg';
import css from '../Sidebar/Sidebar.module.css';
import ModalBoard from './ModalBoard';

const EditBoard = ({ id, title, icon, background, checked }) => {
  const isBoardsLoading = useSelector(selectIsBoardsLoading);
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => setIsModalOpen(state => !state);

  const [newTitle, setNewTitle] = useState(title);
  const [newIcon, setNewIcon] = useState(icon);
  const [newBackground, setNewBackground] = useState(background);

  const handleSubmit = event => {
    event.preventDefault();
    dispatch(
      updateBoard({
        id,
        data: {
          title: newTitle,
          icon: newIcon,
          background: newBackground,
        },
      })
    ).then(() => {
      !isBoardsLoading && toggleModal();
    });
  };

  const changeIcon = event => {
    setNewIcon(event.target.value);
  };
  const changeBg = event => {
    setNewBackground(event.target.value);
  };

  const changeTitle = event => {
    setNewTitle(event.target.value);
  };
  const iconActive = !checked
    ? css.sidebarNewBoardButton
    : css.sidebarNewBoardButtonActive;
  const modalProps = {
    isModalOpen,
    toggleModal,
    handleSubmit,
    changeBg,
    changeIcon,
    changeTitle,
    title,
    icon,
    background,
    newTitle,
    newIcon,
    newBackground,
  };
  return (
    <div>
      <button className={iconActive} type="button" onClick={toggleModal}>
        <svg className={css.sidebarNewBoardIcon}>
          <use href={sprite + '#icon-pencil'} />
        </svg>
      </button>
      <ModalBoard
        {...modalProps}
        modalTitle="Edit Board"
        submitButtonText="Edit"
      />
    </div>
  );
};

export default EditBoard;
