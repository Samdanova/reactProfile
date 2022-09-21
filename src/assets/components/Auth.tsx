import { Navigate } from 'react-router-dom';
import contacts from '../../../contacts.json'
import Contacts from './Contacts';

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
        {children}
    </>;
};

export default Auth;
