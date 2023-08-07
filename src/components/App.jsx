import { Routes, Route, Navigate } from 'react-router-dom';
import PrivateRoute from '../Router/PrivateRoute';
import RestrictedRoute from '../Router/RestrictedRoute';
import AuthPage from '../pages/AuthPage/AuthPage';
import WelcomePage from '../pages/WelcomePage/WelcomePage';
import ScreensPage from './ScreensPage/ScreensPage';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { refreshUser } from 'redux/auth/operations';
import { selectIsRefreshing } from 'redux/auth/selectors';
import { Loader } from './Loader/Loader';

const App = () => {

  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return isRefreshing ? (
    <Loader/>
  ) :(
    <Routes>
      <Route path="/" element={<Navigate to="/welcome" />} />
      <Route path="/welcome" element={<WelcomePage />} />
      <Route path="/auth" element={<Navigate to="/auth/login" />} />
      <Route
        path="/auth/:id"
        element={
          <RestrictedRoute redirectTo="/home" component={<AuthPage />} />
        }
      />
      <Route
        path="/home"
        element={
          <PrivateRoute redirectTo="/auth" component={<ScreensPage />} />
        }
      />
      <Route path="/home/:boardName" element={<ScreensPage />} />
    </Routes>
  );
};

export default App;
