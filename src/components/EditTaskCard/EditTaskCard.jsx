import { Field, Form, Formik } from 'formik';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ClipLoader from 'react-spinners/ClipLoader';
import { selectIsBoardsLoading } from 'redux/boards/selectors';

import { updateTask } from 'redux/boards/operations';
import { object, string } from 'yup';
import sprite from '../../images/sprite.svg';
import Modal from '../Modal/Modal';
import styles from './EditTaskCard.module.css';

// додавання календаря
import CustomMonthLayout from 'components/Calendar/Calendar';
import { format } from 'date-fns';
// const today = new Date();

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
    deadline,
  } = task;

  const isBoardsLoading = useSelector(selectIsBoardsLoading);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => setIsModalOpen(state => !state);

  const dispatch = useDispatch();
  const [title, setTitle] = useState(oldTitle);
  const [description, setDescription] = useState(oldDescription);
  const [priority, setPriority] = useState(oldPriority);
  const deadlineInDate = new Date(
    deadline.replace('/', '.').replace(/(\d+).(\d+).(\d+)/, '$3/$2/$1')
  );
  const [newDaySelected, setNewDaySelected] = useState(deadlineInDate);

  const initialValues = {
    title: '',
    description: '',
    priority: oldPriority,
  };

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
    console.log(taskId);
    dispatch(
      updateTask({
        id: taskId,
        data: {
          title: title,
          description: description,
          priority: priority,
          deadline: format(newDaySelected, 'dd/MM/yyyy'),
        },
      })
    )
      .then(() => {
        !isBoardsLoading && toggleModal();
      })
      .else(setSubmitting(false));
  };

  const radioOptions = [
    { color: '#8fa1d0', priority: 'low' },
    { color: '#e09cb5', priority: 'medium' },
    { color: '#bedbb0', priority: 'high' },
    { color: 'rgba(255, 255, 255, 0.3)', priority: 'without' },
  ];

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
                  <div className={styles.priorityIcons}>
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

                <CustomMonthLayout
                  daySelected={newDaySelected}
                  setDaySelected={setNewDaySelected}
                />

                <button
                  className={styles.btn}
                  type="submit"
                  onClick={() => {
                    setFieldValue('title', title);
                    setFieldValue('description', description);
                  }}
                >
                  {isBoardsLoading ? (
                    <ClipLoader color="#1f1f1f" size={30} />
                  ) : (
                    <svg className={styles.btnIcon}>
                      <use href={sprite + '#icon-plus'}></use>
                    </svg>
                  )}
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
