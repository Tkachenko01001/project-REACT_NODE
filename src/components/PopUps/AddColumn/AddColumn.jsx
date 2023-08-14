import Button from 'components/Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import { addColumn } from 'redux/boards/operations';
import {
  selectActiveBoard,
  selectIsBoardsLoading,
} from 'redux/boards/selectors';
import styles from './AddColumn.module.css';
import { selectTheme } from 'redux/auth/selectors';

export default function AddColumn({ toggleModal }) {
  const dispatch = useDispatch();
  const activeBoard = useSelector(selectActiveBoard);
  const isBoardsLoading = useSelector(selectIsBoardsLoading);
  const theme = useSelector(selectTheme);

  const handleSubmit = event => {
    event.preventDefault();
    dispatch(
      addColumn({
        title: event.currentTarget[0].value,
        board: activeBoard._id,
      })
    ).then(() => {
      !isBoardsLoading && toggleModal();
    });
  };

  return (
    <>
      <h2 className={styles.title}>Add column</h2>
      <form onSubmit={handleSubmit}>
        <input
          className={theme === 'violet' ? styles.inputViolet : styles.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Title"
          required
        />
        <Button loading={isBoardsLoading} icon="true" text="Add" />
      </form>
    </>
  );
}
