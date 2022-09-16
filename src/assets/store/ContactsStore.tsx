import Password from 'antd/lib/input/Password';
import { makeAutoObservable, runInAction } from 'mobx';

interface IUser {
    email: string;
    password: string | number;
}

interface IProcess {
    isloading: boolean;
    error: boolean;
}

export default class UserStore {
    dataWords = [];
    isloading = false;
    error = false;

    usersArray = [];
    user: IUser | never[] = {
        email: '',
        password: ''
    };
    constructor() {
        makeAutoObservable(this);
    }
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


    handleLogin = async (email: string, password: number | string) => {
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

        this.isloading = false;
    };

}

