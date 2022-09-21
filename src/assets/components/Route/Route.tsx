import { inject, observer } from 'mobx-react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from '../Login/Login';
import Auth from '../Auth/Auth';
import Contacts from '../Contacts';
import { IUser } from '../../store/Store';


interface IRouteMenuProps {
    loggedIn: boolean;
    handleLogin: (email: string, password: string | number) => Promise<void>;
}

function RouteNavigate({ loggedIn, handleLogin }: IRouteMenuProps) {
    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <Auth loggedIn={loggedIn}>
                                <Contacts
                                    getContacts={function (): void {
                                        throw new Error('Function not implemented');
                                    }}
                                    userContacts={[]}
                                />
                            </Auth>
                        }
                    />
                    <Route
                        path="/login"
                        element={
                            <Login
                                handleLogin={handleLogin}
                                loading={false}
                            />
                        }
                    />
                </Routes>
            </Router>
        </div>
    );
}



export default inject(({ Store }) => {
    const { loggedIn, handleLogin, user } = Store;

    return {
        loggedIn,
        handleLogin,
        user
    };
})(observer(RouteNavigate));