import { Navigate } from 'react-router-dom';


import { IUser } from '../store/Store';

interface IAuthProps {
    children: React.ReactNode;
    loggedIn: boolean;
}

interface iContacts {
    id: number;
    name: string;
    mobile: number;
    email: string
}

function Auth({ children, loggedIn }: IAuthProps) {
    if (!loggedIn) {
        return <Navigate to="/login" />;
    }
    return <>
        <div>Добро пожаловать, { }</div>
        {children}

    </>;
};

export default Auth;
