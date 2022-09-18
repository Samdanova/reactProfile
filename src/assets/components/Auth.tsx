import { Navigate } from 'react-router-dom';

interface IAuthProps {
    children: React.ReactNode;
    loggedIn: boolean;
}

function Auth({ children, loggedIn }: IAuthProps) {
    if (!loggedIn) {
        return <Navigate to="/login" />;
    }
    return <>{children}</>;
};

export default Auth;
