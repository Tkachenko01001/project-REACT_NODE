import { useParams } from 'react-router-dom';
import { RegisterForm } from './RegisterForm/RegisterForm';
import { LogInForm } from './LogInForm/LogInForm';
import { Layout, AuthLink, RegisterFormWindow, Text } from './AuthForm.styled';

const AuthForm = () => {
  const { id } = useParams();

  return (
    <Layout>
      {id === 'login' && (
        <RegisterFormWindow>
          <div>
            <AuthLink to="/auth/register">Registration</AuthLink>
            <Text>Log In</Text>
          </div>
          <LogInForm />
        </RegisterFormWindow>
      )}
      {id === 'register' && (
        <RegisterFormWindow>
          <div>
            <Text>Registration</Text>
            <AuthLink to="/auth/login">Log In</AuthLink>
          </div>
          <RegisterForm />
        </RegisterFormWindow>
      )}
    </Layout>
  );
};

export default AuthForm;
