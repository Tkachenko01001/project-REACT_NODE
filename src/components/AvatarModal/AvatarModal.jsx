import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import styles from './AvatarModal.module.css';

export function Previews(props) {
  const [files, setFiles] = useState([]);
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': [],
    },
    onDrop: acceptedFiles => {
      setFiles(
        acceptedFiles.map(file =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  const thumbs = files.map(file => (
    <div className={styles.thumb} key={file.name}>
      <img
        src={file.preview}
        alt="avatarURL"
        className={styles.imageG}
        onLoad={() => {
          URL.revokeObjectURL(file.preview);
        }}
      />
    </div>
  ));

  useEffect(() => {
    return () => files.forEach(file => URL.revokeObjectURL(file.preview));
  }, [files]);

  return (
    <section className={styles.container}>
      <div
        className={styles.imageG}
        {...getRootProps({ className: 'dropzone' })}
      >
        <input {...getInputProps()} />
        <aside className={styles.thumbsContainer}>{thumbs}</aside>
        <span className={styles.btn}>+</span>
      </div>
    </section>
  );
}
