import styles from './EditColumn.module.css';
import Button from 'components/Button/Button';

export default function EditColumn({ onSubmit }) {
  const handleSubmit = event => {
    event.preventDefault();
    onSubmit(event.currentTarget.value.trim());
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
          placeholder="Title"
        />
      </form>
      <Button icon="true" text="Edit" />
    </>
  );
}
