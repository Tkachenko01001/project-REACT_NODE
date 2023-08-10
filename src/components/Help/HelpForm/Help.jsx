import { useState } from 'react';
import styles from './Help.module.css';
import axios from 'axios';
import css from '../../Sidebar/Sidebar.module.css';
import Modal from '../../Modal/Modal';

axios.defaults.baseURL = 'https://project-react-node-back.onrender.com';

export const HelpForm = () => {
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

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
        console.log(res.data.message);
        alert(res.data.message);
        reset();
        toggleModal();
        return res.data;
      }
    } catch (error) {
      if (error.response) {
        const { status, data } = error.response;
        console.log(`Status Code: ${status}`);
        console.log(`Error Message: ${data.message}`);
      } else {
        console.log('Network Error');
      }
    }
  };

  return (
    <div>
      <p className={css.sidebarHelpBoxItem}>
        If you need help with{' '}
        <button
          onClick={toggleModal}
          className={css.sidebarHelpBoxLink}
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
              className={styles.inputEmail}
              type="email"
              name="email"
              placeholder="Email address"
              autocomplete="off"
              required
              value={email}
              onChange={handleChange}
            />
            <input
              className={styles.inputComment}
              type="text"
              name="comment"
              placeholder="Comment"
              autocomplete="off"
              required
              value={comment}
              onChange={handleChange}
            />
            <button className={styles.btn} type="submit">
              Send
            </button>
          </form>
        </Modal>
      )}
    </div>
  );
};
// <Formik
//   initialValues={initialValues}
//   validationSchema={HelpSchema}
//   onSubmit={handleSubmit}
// >
//   {({ errors, values, setFieldValue }) => (
//     <Form autoComplete="off" className={styles.form}>
//       <div className={styles.wrap}>
//         <Field
//           className={styles.input}
//           type="email"
//           name="email"
//           placeholder="Email address"
//         />
//         {errors.email && <FormError name="email" message={errors.email} />}
//       </div>

//       <div className={styles.wrap}>
//         <Field
//           className={styles.inputComment}
//           type="text"
//           name="comment"
//           placeholder="Comment"
//         />
//         {errors.comment && (
//           <FormError name="comment" message={errors.comment} />
//         )}
//       </div>

//       <button className={styles.btn} type="submit">
//         <div className={styles.wrap}>
//           <span>Send</span>
//           <Loader />
//         </div>
//       </button>
//     </Form>
//   )}
// </Formik>
//   );
// };
