// import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { HelpSchema } from '../HelpSchema/HelpSchema';
import { Loader } from '../../Loader/Loader';
import styles from './Help.module.css';
import axios from 'axios';

axios.defaults.baseURL = 'https://project-react-node-back.onrender.com';

export const FormError = ({ name, message }) => (
  <ErrorMessage
    name={name}
    render={() => <p className={styles.error}>{message}</p>}
  />
);

export const HelpForm = () => {
  const initialValues = {
    email: '',
    comment: '',
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const { email, comment } = values;
      const res = await axios.post('/api/help', { email, comment });
      setSubmitting(false);
      console.log(res.data);
      return res.data;
    } catch (error) {
      console.log('Error submitting form:', error.message);
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={HelpSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, values, setFieldValue }) => (
        <Form autoComplete="off" className={styles.form}>
          <div className={styles.wrap}>
            <Field
              className={styles.input}
              type="email"
              name="email"
              placeholder="Email address"
            />
            {errors.email && <FormError name="email" message={errors.email} />}
          </div>

          <div className={styles.wrap}>
            <Field
              className={styles.inputComment}
              type="text"
              name="comment"
              placeholder="Comment"
            />
            {errors.comment && (
              <FormError name="comment" message={errors.comment} />
            )}
          </div>

          <button className={styles.btn} type="submit">
            <div className={styles.wrap}>
              <span>Send</span>
              <Loader />
            </div>
          </button>
        </Form>
      )}
    </Formik>
  );
};

// import sprite from '../../images/sprite.svg';
// import styles from './Help.module.css';
// import { NavLink } from 'react-router-dom';

// const Help = () => {
//   return (
//     <div className={styles.wrapper}>
//       <p className={styles.description}>
//         If you need help with <span className={styles.taskPro}>TaskPro</span>,
//         check out our support resources or reach out to our customer support
//         team.
//       </p>
//       <NavLink className={styles.btn} to="/help">
//         <svg
//           className={styles.icon}
//           width={20}
//           height={20}
//           aria-label="icon-question-mark"
//         >
//           <title>Help-circle Icon</title>
//           <use href={sprite + '#icon-help-circle'} />
//         </svg>
//         <p className={styles.text}>Need help?</p>
//       </NavLink>
//     </div>
//   );
// };

// export default Help;
