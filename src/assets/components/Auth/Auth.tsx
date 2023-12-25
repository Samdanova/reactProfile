import { inject, observer } from 'mobx-react';
import { Navigate } from 'react-router-dom';
import "./Auth.css"


interface IAuthProps {
    children: React.ReactNode;
    loggedIn: boolean;
}

function Auth({ children, loggedIn }: IAuthProps) {
    if (!loggedIn) {
        return <Navigate to="/login" />;
    }
    return <>
        <div className="welcome">Welcome! Your contacts:</div>
        {children};
    </>
};

export default inject(({ Store }) => {
    const { user } = Store;
    return {
        user
    };
})(observer(Auth));
