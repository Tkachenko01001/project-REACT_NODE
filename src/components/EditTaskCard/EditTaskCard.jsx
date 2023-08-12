import { useState } from 'react';
import Modal from '../Modal/Modal';
import { Formik, Form, Field } from 'formik';
import { object, string } from 'yup';
import styles from './EditTaskCard.module.css';
import sprite from '../../images/sprite.svg';
import { useDispatch } from 'react-redux';
import { updateTask } from 'redux/boards/operations';

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

export const EditTaskCard = ({ task }) => {
  const {
    _id: taskId,
    title: oldTitle,
    description: oldDescription,
    priority: oldPriority,
  } = task;
  const [title, setTitle] = useState(oldTitle);
  const [description, setDescription] = useState(oldDescription);
  const [priority, setPriority] = useState(oldPriority);
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
  const onSubmit = (values, { setSubmitting }) => {
    dispatch(
      updateTask([
        taskId,
        {
          title: title,
          description: description,
          priority: priority,
          deadline: '15082023',
        },
      ])
    );
    setTitle('');
    setDescription('');
    setPriority('');
    setSubmitting(false);
    toggleModal();
  };

  return (
    <div>
      <button className={styles.cardButton} onClick={toggleModal}>
        <svg
          width={16}
          height={16}
          aria-label="icon-pencil"
          className={styles.svg}
        >
          <title>Edit card</title>
          <use href={sprite + '#icon-pencil'} />
        </svg>
      </button>
      {isModalOpen && (
        <Modal onClose={toggleModal}>
          <Formik
            initialValues={initialValues}
            validationSchema={registerSchema}
            onSubmit={onSubmit}
          >
            {({ setFieldValue }) => (
              <Form autoComplete="off">
                <p className={styles.title}>Edit card</p>
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
                    // toggleModal();
                  }}
                >
                  <svg className={styles.btnIcon}>
                    <use href={sprite + '#icon-plus'}></use>
                  </svg>
                  <span>Edit</span>
                </button>
              </Form>
            )}
          </Formik>
        </Modal>
      )}
    </div>
  );
};
