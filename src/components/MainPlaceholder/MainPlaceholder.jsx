import ModalBoard from 'components/ModalBoard/ModalBoard';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addBoard } from 'redux/boards/operations';
import { selectIsBoardsLoading } from 'redux/boards/selectors';
import styles from './MainPlaceholder.module.css';
import { selectTheme } from 'redux/auth/selectors';

const MainPlaceholder = () => {
  const theme = useSelector(selectTheme);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => setIsModalOpen(state => !state);
  const isBoardsLoading = useSelector(selectIsBoardsLoading);
  const required = true;
  const [icon, setIcon] = useState('icon-project');
  const [background, setBackground] = useState(null);

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
        setBackground(null);
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
    <div className={styles.mainDashboardContainer}>
      <p className={styles.dashboardDefaultParagraph}>
        Before starting your project, it is essential
        <button
          type="button"
          className={
            theme === 'violet' ? styles.createBoardViolet : styles.createBoard
          }
          onClick={toggleModal}
        >
          to create a board
        </button>
        to visualize and track all the necessary tasks and milestones. This
        board serves as a powerful tool to organize the workflow and ensure
        effective collaboration among team members.
      </p>

      <ModalBoard
        {...modalProps}
        modalTitle="New board"
        submitButtonText="Create"
      />
    </div>
  );
};

export default MainPlaceholder;
