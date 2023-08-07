import { useSelector } from 'react-redux';
import { selectUser } from 'redux/auth/selectors';

export const useAuth = () => {
  const user = useSelector(selectUser);

  return {
    user,
  };
};
