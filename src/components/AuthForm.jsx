import { useParams } from "react-router-dom";

const AuthForm = () => {
    const { id } = useParams();

    return (
        <div>
            {id === 'register' && <div>register</div>}
            {id === 'login' && <div>login</div>}
        </div>
    );
};

export default AuthForm;