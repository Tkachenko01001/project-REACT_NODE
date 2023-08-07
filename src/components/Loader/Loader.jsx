import ClipLoader from 'react-spinners/ClipLoader';
import { useSelector } from 'react-redux';
import { selectIsLoading } from '../../redux/auth/selectors';

const override = {
  position: 'absolute',
  top: '3px',
  right: '-20px',
};

export const Loader = () => {
  const isLoading = useSelector(selectIsLoading);
  return (
    <ClipLoader
      color="#1f1f1f"
      cssOverride={override}
      size={14}
      loading={isLoading}
    />
  );
};
