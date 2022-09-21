import { inject, observer } from 'mobx-react';
import { Navigate } from 'react-router-dom';
import "./Auth.css"


interface IAuthProps {
    children: React.ReactNode;
    loggedIn: boolean;
}

interface iContacts {
    id: number;
    name: string;
    mobile: number;
    email: string;
}

function Auth({ children, loggedIn }: IAuthProps) {
    if (!loggedIn) {
        return <Navigate to="/login" />;
    }
    return <>
        <div className="welcome">Добро пожаловать! Ваши контакты:</div>
        {children};
    </>
};

export default inject(({ Store }) => {
    const { user } = Store;
    return {
        user
    };
})(observer(Auth));
