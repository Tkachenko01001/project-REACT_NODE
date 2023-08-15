import Button from 'components/Button/Button';
import CustomMonthLayout from 'components/Calendar/Calendar';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ClipLoader from 'react-spinners/ClipLoader';
import { selectTheme } from 'redux/auth/selectors';
import { addTask } from 'redux/boards/operations';
import { selectIsBoardsLoading } from 'redux/boards/selectors';
import { object, string } from 'yup';
import sprite from '../../images/sprite.svg';
import Modal from '../Modal/Modal';
import styles from './AddTaskCard.module.css';

import { format } from 'date-fns';

const today = new Date();

const initialValues = {
  title: '',
  description: '',
  priority: '',
  deadline: today,
};

const addTaskCardSchema = object({
  title: string().required(),
  priority: string(),
  description: string().required(),
});

export const AddTaskCard = ({ columnId }) => {
  const dispatch = useDispatch();
  const theme = useSelector(selectTheme);
  const isBoardsLoading = useSelector(selectIsBoardsLoading);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => setIsModalOpen(state => !state);

  const [daySelected, setDaySelected] = useState(today);

  const radioOptions = [
    { color: '#8fa1d0', priority: 'low' },
    { color: '#e09cb5', priority: 'medium' },
    { color: '#bedbb0', priority: 'high' },
    {
      color:
        theme === 'dark' ? 'rgba(255, 255, 255, 0.3)' : 'rgba(22, 22, 22, 0.3)',
      priority: 'without',
    },
  ];

  const FormError = ({ name }) => {
    return (
      <ErrorMessage
        name={name}
        render={message => <p className={styles.error}>{message}</p>}
      />
    );
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
    dispatch(
      addTask({
        title: title,
        description: description,
        priority: priority || 'without',
        deadline: format(daySelected, 'dd/MM/yyyy'),
        column: columnId,
      })
    ).then(() => {
      !isBoardsLoading && toggleModal();
    });
    setTitle('');
    setDescription('');
    setPriority('');
    setDaySelected(today);
    setSubmitting(false);
  };

  return (
    <div>
      <Button icon="true" text="Add another card" onClick={toggleModal} />
      {isModalOpen && (
        <Modal onClose={toggleModal}>
          <Formik
            initialValues={initialValues}
            validationSchema={addTaskCardSchema}
            onSubmit={onSubmit}
          >
            {({ errors, setFieldValue }) => (
              <Form autoComplete="off">
                <p className={styles.title}>Add card</p>
                <div className={styles.wrapError}>
                  <Field
                    className={
                      theme === 'violet' ? styles.inputViolet : styles.input
                    }
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={title}
                    onChange={e => handleChange(e, setFieldValue)}
                  />
                  {errors.title && <FormError name="title" />}
                </div>

                <div className={styles.wrapError}>
                  <Field
                    as="textarea"
                    className={
                      theme === 'violet'
                        ? styles.textareaViolet
                        : styles.textarea
                    }
                    name="description"
                    placeholder="Description"
                    value={description}
                    onChange={e => handleChange(e, setFieldValue)}
                  />
                  {errors.description && <FormError name="description" />}
                </div>

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
                          className={
                            theme === 'dark'
                              ? styles.radioButtonDark
                              : styles.radioButton
                          }
                          style={{ backgroundColor: option.color }}
                        ></span>
                      </label>
                    ))}
                  </div>
                </div>
                <span className={styles.label}>Deadline</span>
                <CustomMonthLayout
                  daySelected={daySelected}
                  setDaySelected={setDaySelected}
                />

                <button
                  className={theme === 'violet' ? styles.btnViolet : styles.btn}
                  type="submit"
                  onClick={() => {
                    setFieldValue('title', title);
                    setFieldValue('description', description);
                  }}
                >
                  {isBoardsLoading ? (
                    <ClipLoader color="#1f1f1f" size={30} />
                  ) : (
                    <svg
                      className={
                        theme === 'violet'
                          ? styles.btnIconViolet
                          : styles.btnIcon
                      }
                    >
                      <use href={sprite + '#icon-plus'}></use>
                    </svg>
                  )}
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
