import avaDark from '../../images/user_dark.svg';
import avaLight from '../../images/user_light.svg';
import avaViolet from '../../images/user_violet.svg';
import { Puff } from 'react-loader-spinner';

const Avatar = ({ size, onClick, isLoading, preload }) => {
  const defaultAvatar = {
    dark: avaDark,
    light: avaLight,
    violet: avaViolet,
  };
  let src = user.avatar ? user.avatar : defaultAvatar[user.theme];
  if (preload) src = preload;

  const mainColor = {
    dark: '#bedbb0',
    light: '#bedbb0',
    violet: '#5255bc',
  };

  return (
    <>
      {isLoading ? (
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
      ) : (
        <img
          src={src}
          alt={user.name}
          width={size}
          height={size}
          onClick={onClick}
          style={{ borderRadius: '5px', cursor: 'pointer' }}
        />
      )}
    </>
  );
};

export default Avatar;
