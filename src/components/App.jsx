import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PrivateRoute from '../Router/PrivateRoute';
import RestrictedRoute from '../Router/RestrictedRoute';
import { selectActiveBoard, selectBoardsList } from 'redux/boards/selectors';
import { refreshUser } from 'redux/auth/operations';
import { selectIsRefreshing } from 'redux/auth/selectors';

import { Loader } from './Loader/Loader';

import WelcomePage from 'pages/WelcomePage/WelcomePage';
import HomePage from 'pages/HomePage/HomePage';
import AuthPage from 'pages/AuthPage/AuthPage';

const App = () => {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);
  
  const allBoards = useSelector(selectBoardsList);
  const activeBoard = useSelector(selectActiveBoard);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  useEffect(() => {
    if (allBoards.length > 0 && Object.keys(activeBoard).length === 0) {
      navigate(`/home/${allBoards[0]._id}`);
    }

    if (allBoards.length === 0) {
      navigate('/home');
    }
  }, [navigate, allBoards, activeBoard]);

  return isRefreshing ? (
    <Loader />
  ) : (
    <Routes>
      <Route
        path="/"
        element={
          <RestrictedRoute
            redirectTo="/home"
            component={<Navigate to="/welcome" />}
          />
        }
      />
      <Route
        path="/welcome"
        element={
          <RestrictedRoute redirectTo="/home" component={<WelcomePage />} />
        }
      />

      <Route path="/auth" element={<Navigate to="/auth/login" />} />
      <Route
        path="/auth/:id"
        element={
          <RestrictedRoute redirectTo="/home" component={<AuthPage />} />
        }
      />

      <Route
        path="/home"
        element={<PrivateRoute redirectTo="/auth" component={<HomePage />} />}
      />

      <Route
        path="/home/:boardName"
        element={<PrivateRoute redirectTo="/auth" component={<HomePage />} />}
      />

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default App;
