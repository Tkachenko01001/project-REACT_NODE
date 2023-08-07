import { useParams, Link } from 'react-router-dom';
import styles from './AuthPage.module.css';
import { RegisterForm } from '../../components/AuthForm/RegisterForm/RegisterForm';
import { LogInForm } from '../../components/AuthForm/LogInForm/LogInForm';

const AuthForm = () => {
  const { id } = useParams();

  return (
    <section className={styles.section}>
      <div className={styles.wrapper}>
        {id === 'login' && (
          <div className={styles.register_form_window}>
            <div>
              <Link
                to="/auth/register"
                className={(styles.form_title, styles.active)}
              >
                Registration
              </Link>
              <span className={styles.form_title}>Log In</span>
            </div>
            <LogInForm />
          </div>
        )}
        {id === 'register' && (
          <div className={styles.register_form_window}>
            <div>
              <span className={styles.form_title}>Registration</span>
              <Link
                to="/auth/login"
                className={(styles.form_title, styles.active)}
              >
                Log In
              </Link>
            </div>
            <RegisterForm />
          </div>
        )}
      </div>
    </section>
  );
};

export default AuthForm;
