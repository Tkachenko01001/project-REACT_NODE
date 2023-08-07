import { Routes, Route, Navigate } from 'react-router-dom';
import PrivateRoute from '../Router/PrivateRoute';
import RestrictedRoute from '../Router/RestrictedRoute';
import AuthPage from '../pages/AuthPage/AuthPage';
import WelcomePage from '../pages/WelcomePage/WelcomePage';
import HomePage from 'pages/HomePage/HomePage';
import ScreensPage from './ScreensPage/ScreensPage';

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
        element={
          <PrivateRoute redirectTo="/auth" component={<ScreensPage />} />
        }
      />

      <Route path="/home/:boardName" element={<HomePage />} />
    </Routes>
  );
};

export default App;
