import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';

const thumbsContainer = {
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
};

const ggg = {
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
};

const thumb = {
  display: 'inline-flex',
  borderRadius: 8,

  width: 68,
  height: 68,

  boxSizing: 'border-box',
};

const thumbInner = {
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden',
};

const img = {
  display: 'block',
  width: 'auto',
  height: '100%',
  borderRadius: 8,
};

const btn = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'white',
  backgroundColor: 'green',
  borderRadius: 8,
  width: 24,
  height: 24,
};

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
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img
          src={file.preview}
          alt="avatarURL"
          style={img}
          onLoad={() => {
            URL.revokeObjectURL(file.preview);
          }}
        />
      </div>
    </div>
  ));

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach(file => URL.revokeObjectURL(file.preview));
  }, [files]);

  return (
    <section className="container">
      <div style={ggg} {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        <aside style={thumbsContainer}>{thumbs}</aside>
        <span style={btn}>+</span>
      </div>
    </section>
  );
}
