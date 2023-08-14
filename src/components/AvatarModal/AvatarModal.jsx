import { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from 'redux/auth/selectors';
import styles from './AvatarModal.module.css';
import avaDark from '../../images/user_dark.svg';
import avaLight from '../../images/user_light.svg';
import avaViolet from '../../images/user_violet.svg';
import { selectTheme } from 'redux/auth/selectors';

export function Previews({ onImageSelect }) {
  const user = useSelector(selectUser);
  const theme = useSelector(selectTheme);
  const fileInput = useRef(null);

  const defaultAvatar = {
    dark: avaDark,
    light: avaLight,
    violet: avaViolet,
  };
  const defaultPreview = user.avatarURL
    ? user.avatarURL
    : defaultAvatar[user.theme];

  const [preview, setPreview] = useState(defaultPreview);

  const handlePickImage = e => {
    const selectedFile = e.target.files[0];
    onImageSelect(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
  };

  const handleLoadedImage = () => {
    if (preview.startsWith('blob:')) URL.revokeObjectURL(preview);
  };

  return (
    <section className={styles.container}>
      <div className={styles.imageG}>
        <input
          className={styles.fileInput}
          type="file"
          accept=".jpg, .jpeg, .png"
          onChange={handlePickImage}
          ref={fileInput}
        />
        <aside className={styles.thumbsContainer}>
          <div className={styles.thumb}>
            <img
              src={preview}
              alt="avatarURL"
              className={styles.imageG}
              onLoad={handleLoadedImage}
            />
          </div>
        </aside>
        <span
          className={theme === 'violet' ? styles.btnViolet : styles.btn}
          onClick={() => fileInput.current.click()}
        >
          +
        </span>
      </div>
    </section>
  );
}
