import { useSelector } from 'react-redux';
import { selectUser } from 'redux/auth/selectors';
import { selectIsLoading } from 'redux/auth/selectors';

import avaDark from '../../images/user_dark.svg';
import avaLight from '../../images/user_light.svg';
import avaViolet from '../../images/user_violet.svg';

import { Puff } from 'react-loader-spinner';

const Avatar = ({ size, onClick, preload }) => {
  const user = useSelector(selectUser);
  const isLoading = useSelector(selectIsLoading);
  const defaultAvatar = {
    dark: avaDark,
    light: avaLight,
    violet: avaViolet,
  };
  let src = user.avatarURL ? user.avatarURL : defaultAvatar[user.theme];
  if (preload) src = preload;

  const mainColor = {
    dark: '#bedbb0',
    light: '#bedbb0',
    violet: '#5255bc',
  };

  return (
    <>
      {isLoading ? (
        <button
          style={{
            background: 'none',
            border: 'none',
            padding: '0',
          }}
        >
          <Puff
            height="80"
            width="80"
            radius={1}
            color={mainColor[user.theme]}
            ariaLabel="puff-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </button>
      ) : (
        <button
          style={{
            background: 'none',
            border: 'none',
            padding: '0',
          }}
        >
          <img
            src={src}
            alt={user.name}
            width={size}
            height={size}
            onClick={onClick}
            style={{
              borderRadius: '5px',
              cursor: 'pointer',
              border: '1px solid #808080',
            }}
          />
        </button>
      )}
    </>
  );
};

export default Avatar;
