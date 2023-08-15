import { useState } from 'react';
import styles from './Help.module.css';
import axios from 'axios';
import css from '../../NeedHelp/NeedHelp.module.css';
import Modal from '../../Modal/Modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';
import { selectTheme } from 'redux/auth/selectors';

axios.defaults.baseURL = 'https://project-react-node-back.onrender.com';

export const HelpForm = () => {
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const theme = useSelector(selectTheme);

  const toggleModal = () => setIsModalOpen(state => !state);

  const handleChange = event => {
    const { name, value } = event.target;

    switch (name) {
      case 'email':
        setEmail(value);
        break;

      case 'comment':
        setComment(value);
        break;

      default:
        return;
    }
  };

  const reset = () => {
    setEmail('');
    setComment('');
  };

  const handleSubmit = async event => {
    event.preventDefault();

    try {
      if (email !== '' && comment !== '') {
        const res = await axios.post('/api/users/help', { email, comment });
        toast.success(res.data.message);
        reset();
        toggleModal();
        return res.data;
      }
    } catch (error) {
      if (error.response) {
        const { status, data } = error.response;
        toast.error(`Status(${status}): ${data.message}`);
      } else {
        toast.error('Network Error');
      }
    }
  };

  return (
    <>
      <p className={css.sidebarHelpBoxItem}>
        If you need help with{' '}
        <button
          onClick={toggleModal}
          className={
            theme === 'violet'
              ? css.sidebarHelpBoxLinkViolet
              : css.sidebarHelpBoxLinkGreen
          }
          type="button"
          aria-label="Open Help Modal for TaskPro"
        >
          TaskPro
        </button>
        , check out our support resources or reach out to our customer support
        team.
      </p>
      {isModalOpen && (
        <Modal onClose={toggleModal}>
          <form onSubmit={handleSubmit}>
            <h1 className={styles.title}>Need help</h1>
            <input
              className={theme === 'violet' ? styles.inputViolet : styles.input}
              type="email"
              name="email"
              placeholder="Email address"
              autocomplete="off"
              required
              value={email}
              onChange={handleChange}
            />
            <textarea
              className={
                theme === 'violet' ? styles.textareaViolet : styles.textarea
              }
              type="text"
              name="comment"
              placeholder="Comment"
              autocomplete="off"
              required
              value={comment}
              onChange={handleChange}
            />
            <button
              className={theme === 'violet' ? styles.btnViolet : styles.btn}
              type="submit"
            >
              Send
            </button>
          </form>
        </Modal>
      )}
      <ToastContainer position="top-left" autoClose={3000} />
    </>
  );
};
