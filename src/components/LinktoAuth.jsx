import { Link } from 'react-router-dom';

const LinkToAuth = () => {
    return (
      <div>
        <Link to="/auth/register">Register</Link>
        <Link to="/auth/login">Login</Link>
      </div>
    );
};

export default LinkToAuth;