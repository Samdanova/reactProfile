
import { makeAutoObservable, runInAction } from 'mobx';

interface IUser {
    email: string;
    password: string | number;
}

interface IProcess {
    isloading: boolean;
    error: boolean;
}
interface IСontacts {
    id: number;
    name: string;
    mobile: string;
}
export default class Store {


    usersArray = [];
    user: IUser | never[] = {
        email: '',
        password: ''
    };
    constructor() {
        makeAutoObservable(this);
    }
    isloading = false;
    error = false;
    loggedIn: boolean = false;
    userContacts = [];

    getUsers = async () => {
        this.isloading = true;

        await fetch(`https://my-json-server.typicode.com/Samdanova/user/user`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Что-то пошло не так ...');
                }
            })
            .then((response) => {
                runInAction(() => {
                    this.usersArray = response;
                });
            })
            .catch((err) => {
                console.log(err);
                this.error = true;
            })
            .finally(() => {
                this.isloading = false;
            });
    };


    handleLogin = async ({ email, password }: IUser) => {
        this.isloading = true;

        if (this.usersArray.length === 0) {
            await this.getUsers();
        }

        runInAction(() => {
            this.user = this.usersArray.filter(
                (user: { email: string; password: string | number; }) => {
                    return user.password === password && user.email === email;
                },
            );
        });
        if (this.user) {
            this.loggedIn = true;
            this.getContacts();
        }
        this.isloading = false;
    };

    getContacts = async () => {
        this.isloading = true;

        await fetch(`http://localhost:3001/contacts`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Что-то пошло не так ...');
                }
            })
            .then((response) => {
                runInAction(() => {
                    this.userContacts = response;
                });
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                runInAction(() => {
                    this.isloading = false;
                });
            });
    };


}

