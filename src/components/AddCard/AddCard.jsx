import { useState } from 'react';
import Modal from '../Modal/Modal';
import { Formik, Form, Field } from 'formik';
import { object, string } from 'yup';
import styles from '../AddCard/AddCard.module.css';
import sprite from '../../images/sprite.svg';

const initialValues = {
  title: '',
  description: '',
  color: '',
};

const registerSchema = object({
  title: string().required(),
  color: string().required(),
  description: string().required(),
});

export const AddCard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => setIsModalOpen(state => !state);

  const handleSubmit = (values, { resetForm }) => {
    console.log(values);
    resetForm();
  };

  const radioOptions = [
    { color: '#8fa1d0', label: '#8fa1d0' },
    { color: '#e09cb5', label: '#e09cb5' },
    { color: '#bedbb0', label: '#bedbb0' },
    { color: 'rgba(255, 255, 255, 0.3)', label: 'rgba(255, 255, 255, 0.3)' },
  ];

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
              <div className="wrap">
                <span className={styles.label}>Label color</span>
                <div>
                  {radioOptions.map((option, index) => (
                    <label key={index} className={styles.radioLabel}>
                      <Field
                        type="radio"
                        name="color"
                        value={`${option.color}`}
                        className={styles.radioInput}
                      />
                      <span
                        className={styles.radioButton}
                        style={{ backgroundColor: option.color }}
                      ></span>
                    </label>
                  ))}
                </div>
              </div>

              <button className={styles.btn} type="submit">
                <svg className={styles.btnIcon}>
                  <use href={sprite + '#icon-plus'}></use>
                </svg>
                <span>Add</span>
              </button>
            </Form>
          </Formik>
        </Modal>
      )}
    </div>
  );
};
