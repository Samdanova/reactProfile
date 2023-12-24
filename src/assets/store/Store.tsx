
import { Console } from 'console';
import { makeAutoObservable, runInAction } from 'mobx';

export interface IUser {
    email: string;
    password: string;
    name?: string;
}

// interface IProcess {
//     isloading: boolean;
//     error: boolean;
// }
// interface IСontacts {
//     id: number;
//     name: string;
//     mobile: number;
//     email:string;
// }
export default class Store {

    constructor() {
        makeAutoObservable(this);
    }
    usersArray = [];
    user: IUser | never[]= {
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
                    this.usersArray = response
                    console.log(this.usersArray);
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
handleLogin = async (email:string, password:string) => {
        this.isloading = true;
        if (this.usersArray.length === 0) {
            await this.getUsers();
        }

        const foundUser = this.usersArray.find(
          (user: { email: string; password: string | number; }) => {
              return user.password === password && user.email === email;
          },
      );
      if (foundUser) {
        runInAction(() => {
          this.user = foundUser;
          this.loggedIn = true;
          if(localStorage.getItem('email')){
            const local_password = localStorage.getItem('password');
            const local_email = localStorage.getItem('email');
          } else{
            localStorage.setItem('email', email);
            localStorage.setItem('password', password);
            localStorage.setItem('loggedIn', 'true');
          }
          this.getContacts();
      });
    }
  this.isloading = false;
    };

    handleAddContact = async (
        name: string,
        email: string,
        mobile: string,
      ) => {
        this.isloading = true;
        this.error = false;
    
        await fetch(`http://localhost:3001/contacts`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json;charset=utf-8',
          },
          body: JSON.stringify({
            name,
            email,
            mobile,
          }),
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

handleEditContact = async (
        id: number,
        name: string,
        email: string,
        mobile: string,
      ) => {
        this.isloading = true;
        this.error = false;
        await fetch(`http://localhost:3001/contacts/${id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json;charset=utf-8',
          },
          body: JSON.stringify({
            id,
            name,
            email,
            mobile,
          }),
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

logOut= async()=>{
    runInAction(()=>{
        this.loggedIn = false;
        localStorage.removeItem('password');
        localStorage.removeItem('email');
        localStorage.removeItem('loggedIn');
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

