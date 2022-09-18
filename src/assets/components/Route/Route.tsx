import { inject, observer } from 'mobx-react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from '../Login/Login';
// import Contacts from './assets/components/Contacts';
import Auth from '../Auth';
import Contacts from '../Contacts';


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
    const { loggedIn, handleLogin } = Store;

    return {
        loggedIn,
        handleLogin,
    };
})(observer(RouteNavigate));