import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from 'redux/tasks/operations';
import Modal from '../Modal/Modal';
import { Formik, Form, Field } from 'formik';
import { object, string } from 'yup';
import styles from './AddTaskCard.module.css';
import sprite from '../../images/sprite.svg';

const initialValues = {
  title: '',
  description: '',
  priority: '',
};

const registerSchema = object({
  title: string().required(),
  priority: string().required(),
  description: string().required(),
});

export const AddTaskCard = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('');
  const [column] = useState('64d0d5ff12156380132f910a');
  // const addLoading = useSelector(selectTaskIsLoading);
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => setIsModalOpen(state => !state);

  const radioOptions = [
    { color: '#8fa1d0', priority: 'low' },
    { color: '#e09cb5', priority: 'medium' },
    { color: '#bedbb0', priority: 'high' },
    { color: 'rgba(255, 255, 255, 0.3)', priority: 'without' },
  ];

  const handleChange = ({ target: { name, value } }, setFieldValue) => {
    setFieldValue(name, value);
    switch (name) {
      case 'title':
        return setTitle(value);
      case 'description':
        return setDescription(value);
      case 'priority':
        return setPriority(value);
      default:
        return;
    }
  };

  return (
    <div>
      <button onClick={toggleModal}>Відкрити модалку</button>
      {isModalOpen && (
        <Modal onClose={toggleModal}>
          <Formik
            initialValues={initialValues}
            validationSchema={registerSchema}
            onSubmit={(values, { setSubmitting }) => {
              dispatch(
                addTask({
                  title: title,
                  description: description,
                  priority: priority,
                  column: column,
                })
              );
              setTitle('');
              setDescription('');
              setPriority('');
              setSubmitting(false);
            }}
          >
            {({ setFieldValue }) => (
              <Form autoComplete="off">
                <p className={styles.title}>Add card</p>
                <Field
                  className={styles.input}
                  type="text"
                  name="title"
                  placeholder="Title"
                  value={title}
                  onChange={e => handleChange(e, setFieldValue)}
                />

                <Field
                  as="textarea"
                  className={styles.textarea}
                  name="description"
                  placeholder="Description"
                  value={description}
                  onChange={e => handleChange(e, setFieldValue)}
                />
                <div className="wrap">
                  <span className={styles.label}>Label color</span>
                  <div>
                    {radioOptions.map((option, index) => (
                      <label key={index} className={styles.radioLabel}>
                        <Field
                          type="radio"
                          name="priority"
                          value={`${option.priority}`}
                          className={styles.radioInput}
                          onChange={e => handleChange(e, setFieldValue)}
                        />
                        <span
                          className={styles.radioButton}
                          style={{ backgroundColor: option.color }}
                        ></span>
                      </label>
                    ))}
                  </div>
                </div>

                <button
                  className={styles.btn}
                  type="submit"
                  onClick={() => {
                    setFieldValue('title', title);
                    setFieldValue('description', description);
                  }}
                >
                  <svg className={styles.btnIcon}>
                    <use href={sprite + '#icon-plus'}></use>
                  </svg>
                  <span>Add</span>
                </button>
              </Form>
            )}
          </Formik>
        </Modal>
      )}
    </div>
  );
};
