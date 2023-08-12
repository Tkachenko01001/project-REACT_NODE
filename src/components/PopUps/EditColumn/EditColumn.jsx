import styles from './EditColumn.module.css';
import Button from 'components/Button/Button';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateColumn } from 'redux/boards/operations';

export default function EditColumn({ id, title, onClose }) {
  const dispatch = useDispatch();
  const [newTitle, setNewTitle] = useState(title);
  console.log(id);

  const changeTitle = event => {
    setNewTitle(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    dispatch(updateColumn([id, { title: newTitle }]));
    onClose();
  };
  return (
    <>
      <h2 className={styles.title}>Edit column</h2>
      <form onSubmit={handleSubmit}>
        <input
          className={styles.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder={title}
          value={newTitle}
          onChange={changeTitle}
        />
        <Button icon="true" text="Edit" />
      </form>
    </>
  );
}
