import { useParams, Link, useSearchParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import styles from './AuthPage.module.css';
import { RegisterForm } from '../../components/AuthForm/RegisterForm/RegisterForm';
import { LogInForm } from '../../components/AuthForm/LogInForm/LogInForm';
import { useEffect } from 'react';
import { logInWithGoogle } from 'redux/auth/operations';

export default function AuthPage () {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (id.length > 100) {
      const name = searchParams.get("name");
      const email = searchParams.get("email");
      const theme = searchParams.get("theme");
      const avatarURL = searchParams.get("avatarURL");

      dispatch(logInWithGoogle({
        accessToken: id,
        user: {
          name,
          email,
          theme,
          avatarURL,
        },
      }));

      navigate("/home", { replace: true });
    };
  });

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
