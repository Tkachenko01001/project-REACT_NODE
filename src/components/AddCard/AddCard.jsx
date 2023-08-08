import { useState } from 'react';
import Modal from '../Modal/Modal';
import { Formik, Form, Field } from 'formik';
import { object, string } from 'yup';
import styles from '../AddCard/AddCard.module.css';
import sprite from '../../images/sprite.svg';

const initialValues = {
  title: '',
  description: '',
  picked: '',
};

const registerSchema = object({
  title: string().required(),
  picked: string().required(),
  description: string().required(),
});

export const AddCard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => setIsModalOpen(state => !state);
  const handleSubmit = (values, { resetForm }) => {
    console.log(values);
    resetForm();
  };

  return (
    <div>
      <button onClick={toggleModal}>Відкрити модалку</button>
      {isModalOpen && (
        <Modal onClose={toggleModal}>
          <Formik
            initialValues={initialValues}
            validationSchema={registerSchema}
            onSubmit={handleSubmit}
          >
            <Form autoComplete="off">
              <p className={styles.title}>Add card</p>
              <Field
                className={styles.input}
                type="text"
                name="title"
                placeholder="Title"
              />

              <Field
                as="textarea"
                className={styles.textarea}
                name="description"
                placeholder="Description"
              />
              {/* <textarea
                className={styles.textarea}
                name="description"
                placeholder="Description"
              /> */}

              <div id="my-radio-group" className={styles.label}>
                Label color
              </div>
              <div role="group" aria-labelledby="my-radio-group">
                <label className={styles.radio}>
                  <Field type="radio" name="picked" value="One" />
                </label>
                <label className={styles.radio}>
                  <Field type="radio" name="picked" value="Two" />
                </label>
                <label className={styles.radio}>
                  <Field type="radio" name="picked" value="3" />
                </label>
                <label className={styles.radio}>
                  <Field type="radio" name="picked" value="4" />
                </label>
              </div>

              <button className={styles.btn} type="submit">
                <svg className={styles.btnIcon}>
                  <use href={sprite + '#icon-plus'}></use>
                </svg>
                <span>Add</span>
              </button>
            </Form>
          </Formik>

          {/* <input type="radio" />
          <input type="radio" />
          <input type="radio" />
          <input type="radio" chacked="true" />

          <span>Deadline</span> */}
        </Modal>
      )}
    </div>
  );
};
