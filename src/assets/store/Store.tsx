
import { makeAutoObservable, runInAction } from 'mobx';

export interface IUser {
    id?: number;
    email: string;
    password: string | number;
    name?: string;
}

interface IProcess {
    isloading: boolean;
    error: boolean;
}
interface IСontacts {
    id: number;
    name: string;
    mobile: number;
}
export default class Store {

    constructor() {
        makeAutoObservable(this);
    }
    usersArray = [];
    user: IUser | never[] = {
        email: '',
        password: '',
        name: ''
    };
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

        await fetch(`http://localhost:3001/contacts/`, {
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
                    console.log(this.userContacts)
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

logOut= async()=>{
    runInAction(()=>{
        this.loggedIn = false;
})
}

handleDeleteContact = async (
    id: number,
  ) => {
    this.isloading = true;
    this.error = false;

    await fetch(`http://localhost:3001/contacts/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
    })
      .then(() => {
        this.getContacts();
      })
      .catch((err) => {
        console.log(err);
        this.error = true;
      })
      .finally(() => {
        runInAction(() => {
          this.isloading = false;
        });
      });
  };

}

