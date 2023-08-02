import { useParams, Link } from "react-router-dom";

const AuthForm = () => {
    const { id } = useParams();

    return (
      <div>
        {id === 'register' && (
          <div>
            register <Link to="/auth/login">login</Link>
          </div>
        )}
        {id === 'login' && (
          <div>
            login <Link to="/auth/register">register</Link>
          </div>
        )}
      </div>
    );
};

export default AuthForm;