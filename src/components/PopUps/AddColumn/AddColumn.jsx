import styles from './AddColumn.module.css';
import Button from 'components/Button/Button';
import { useSelector, useDispatch } from 'react-redux';
import { selectActiveBoard } from 'redux/boards/selectors';
import { addColumn } from 'redux/boards/operations';

export default function AddColumn({ toggleModal }) {
  const dispatch = useDispatch();
  const activeBoard = useSelector(selectActiveBoard);
  console.log(activeBoard);

  const handleSubmit = event => {
    event.preventDefault();
    dispatch(
      addColumn({
        title: event.currentTarget[0].value,
        board: activeBoard._id,
      })
    );
    toggleModal();
  };

  return (
    <>
      <h2 className={styles.title}>Add column</h2>
      <form onSubmit={handleSubmit}>
        <input
          className={styles.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Title"
          required
        />
        <Button icon="true" text="Add" />
      </form>
    </>
  );
}
