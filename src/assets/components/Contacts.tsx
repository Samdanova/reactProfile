import { inject, observer } from 'mobx-react';


interface IContactProps {
    getContacts: () => void;
    userContacts: IСontacts[];
    loading: boolean;
    // errload: boolean;
    handleDelleteContact: (id: number) => void;
}

interface IСontacts {
    id: number;
    name: string;
    mobile: string;
}

const Contacts = () => {
    return (
        <h1>Hello</h1>
    )
}