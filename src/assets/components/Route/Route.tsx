import { useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from '../Login/Login';
import Auth from '../Auth/Auth';
import Contacts from '../Contacts/Contacts';


interface IRouteMenuProps {
    loggedIn: boolean;
    handleLogin: (email: string, password: string | number) => Promise<void>;
}

function RouteNavigate({ loggedIn, handleLogin}: IRouteMenuProps) {
    useEffect(() => {
        const local_password = localStorage.getItem('password');
        const local_email = localStorage.getItem('email');
        if (local_email && local_password) {
            loggedIn=true;
          handleLogin(local_email, local_password);
        }
      }, []);
    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route
                        path="/home"
                        element={
                            <Auth loggedIn={loggedIn}>
                                <Contacts
                                    getContacts={function (): void {
                                        throw new Error('Function not implemented');
                                    }}
                                    userContacts={[]}
                                    logOut={function (): void {
                                        throw new Error('Function not implemented'); 
                                }}
                                handleDeleteContact={function(id:number):void{
                                    throw new Error('Function not implemented')
                                }}
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
        user,
    };
})(observer(RouteNavigate));