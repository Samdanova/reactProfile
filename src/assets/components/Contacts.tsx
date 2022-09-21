import { inject, observer } from 'mobx-react';
import { Button } from 'antd';
import { Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';

interface IContactProps {
    getContacts: () => void;
    userContacts: ContactsType[];
    loading?: boolean;
    // errload: boolean;
    handleDelleteContact?: (id: number) => void;
}

interface ContactsType {
    id: number;
    name: string;
    mobile: number;
    email: string;
}

function Contacts({ getContacts, userContacts }: IContactProps) {

    const columns: ColumnsType<ContactsType> = [
        {
            title: 'Имя',
            dataIndex: 'name',
            key: 'name',
            render: text => <a>{text}</a>,
        },
        {
            title: 'Номер',
            dataIndex: 'mobile',
            key: 'mobile',
        },
        {
            title: 'E-mail',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Внести изменение',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button>Редактировать</Button>
                    <Button>Удалить</Button>
                </Space>
            ),
        },
    ];

    return (
        <div className='contacts-container'>
            <Table columns={columns} dataSource={userContacts} rowKey={(record) => record.id} />
            <Button>Выйти</Button>
        </div>
    )
}

export default inject(({ Store }) => {
    const { userContacts, getContacts } = Store;

    return {
        userContacts,
        getContacts
    };
})(observer(Contacts));