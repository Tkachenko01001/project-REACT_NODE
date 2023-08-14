import { backgrounds } from 'constants/backgrounds';
import { icons } from 'constants/icons';
import { useSelector } from 'react-redux';
import { selectIsBoardsLoading } from 'redux/boards/selectors';
import { selectTheme } from 'redux/auth/selectors';
import ClipLoader from 'react-spinners/ClipLoader';
import sprite from '../../images/sprite.svg';
import ModalPortal from '../Modal/ModalPortal';
import styles from './ModalBoard.module.css';

const ModalBoard = ({
  isModalOpen,
  toggleModal,
  handleSubmit,
  changeBg,
  changeIcon,
  changeTitle,
  title,
  icon,
  background,
  newTitle,
  newIcon,
  newBackground,
  required,
  modalTitle,
  submitButtonText,
}) => {
  const theme = useSelector(selectTheme);
  const isBoardsLoading = useSelector(selectIsBoardsLoading);
  return (
    isModalOpen && (
      <ModalPortal onClose={toggleModal}>
        <form onSubmit={handleSubmit}>
          <h1 className={styles.title}>{modalTitle}</h1>

          <input
            className={theme === 'violet' ? styles.fieldViolet : styles.field}
            id="title"
            type="text"
            name="title"
            placeholder={newTitle ? newTitle : 'Title'}
            value={newTitle ? newTitle : title}
            onChange={changeTitle}
            required={required ? true : false}
          />
          <div className={styles.label} id="group-label-icon">
            Icons
            <fieldset
              className={styles.priority}
              role="group"
              aria-labelledby="group-label-icon"
            >
              {icons.map(iconItem => (
                <div key={iconItem.key}>
                  <input
                    className={styles.input_svg}
                    id={iconItem.value}
                    type="radio"
                    name="icon"
                    value={iconItem.value}
                    checked={
                      newIcon
                        ? newIcon === iconItem.value
                        : icon === iconItem.value
                    }
                    onChange={changeIcon}
                  />
                  <label className={styles.label_svg} htmlFor={iconItem.value}>
                    <svg className={styles.svg} width="18" height="18">
                      <use href={sprite + `#${iconItem.value}`}></use>
                    </svg>
                  </label>
                </div>
              ))}
            </fieldset>
          </div>

          <div className={styles.label} id="group-label-image">
            Background
            <fieldset
              className={styles.bg_priority}
              role="group"
              aria-labelledby="group-label-image"
            >
              {backgrounds.map(bg => (
                <div key={bg.title}>
                  <input
                    className={styles.input_png}
                    id={bg.title}
                    type="radio"
                    name="bg"
                    value={bg.title}
                    checked={
                      newBackground
                        ? newBackground === bg.title
                        : background === bg.title
                    }
                    onChange={changeBg}
                  />
                  <label className={styles.label_png} htmlFor={bg.title}>
                    <img
                      className={styles.png}
                      alt={bg.title}
                      src={bg.src}
                      width="28"
                      height="28"
                    />
                  </label>
                </div>
              ))}
            </fieldset>
          </div>

          <button
            className={theme === 'violet' ? styles.btnViolet : styles.btn}
            type="submit"
          >
            {isBoardsLoading ? (
              <ClipLoader color="#1f1f1f" size={30} />
            ) : (
              <svg
                className={theme === 'violet' ? styles.iconViolet : styles.icon}
                width="28"
                height="28"
              >
                <use href={sprite + '#icon-plus'}></use>
              </svg>
            )}

            {submitButtonText}
          </button>
        </form>
      </ModalPortal>
    )
  );
};

export default ModalBoard;
