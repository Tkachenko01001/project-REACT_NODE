import { Routes, Route, Navigate } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import AuthForm from './AuthForm';
import WelcomePage from './WelcomePage/WelcomePage';
import LinkToAuth from "./LinktoAuth";
import ScreensPage from './ScreensPage/ScreensPage';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/welcome" />} />
      <Route path="/welcome" element={<WelcomePage />} />
      <Route path="/auth" element={<LinkToAuth />} />
      <Route path="/auth/:id" element={<AuthForm />} />
      <Route
        path="/home"
        element={
          <PrivateRoute redirectTo="/auth" component={<div>home</div>} />
        }
      />
      <Route path="/home/:boardName" element={<ScreensPage />} />
    </Routes>
  );
};

export default App;
