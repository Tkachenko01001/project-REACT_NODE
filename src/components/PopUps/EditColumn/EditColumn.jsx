import Button from 'components/Button/Button';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateColumn } from 'redux/boards/operations';
import { selectIsBoardsLoading } from 'redux/boards/selectors';
import styles from './EditColumn.module.css';
import { selectTheme } from 'redux/auth/selectors';

export default function EditColumn({ id, title, onClose }) {
  const isBoardsLoading = useSelector(selectIsBoardsLoading);
  const dispatch = useDispatch();
  const [newTitle, setNewTitle] = useState(title);
  const theme = useSelector(selectTheme);

  const changeTitle = event => {
    setNewTitle(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    dispatch(updateColumn([id, { title: newTitle }])).then(() => {
      !isBoardsLoading && onClose();
    });
  };
  return (
    <>
      <h2 className={styles.title}>Edit column</h2>
      <form onSubmit={handleSubmit}>
        <input
          className={theme === 'violet' ? styles.inputViolet : styles.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder={title}
          value={newTitle}
          onChange={changeTitle}
        />
        <Button loading={isBoardsLoading} icon="true" text="Edit" />
      </form>
    </>
  );
}
