import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PrivateRoute from '../Router/PrivateRoute';
import RestrictedRoute from '../Router/RestrictedRoute';
import { selectActiveBoard, selectBoardsList } from 'redux/boards/selectors';
import { refreshUser } from 'redux/auth/operations';
import { selectIsLoggedIn, selectIsRefreshing } from 'redux/auth/selectors';
import { Loader } from './Loader/Loader';

import AuthPage from 'pages/AuthPage/AuthPage';
import WelcomePage from 'pages/WelcomePage/WelcomePage';
import HomePage from 'pages/HomePage/HomePage';

const App = () => {
  return (
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
        element={<PrivateRoute redirectTo="/auth" component={<HomePage />} />}
      />

      <Route path="/home/:boardName" element={<HomePage />} />

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default App;
