import { inject, observer } from 'mobx-react';
import { SearchOutlined } from '@ant-design/icons';
import type { InputRef } from 'antd';
import { Button, Input, Space, Table } from 'antd';
import type { ColumnsType, ColumnType } from 'antd/es/table';
import type { FilterConfirmProps } from 'antd/es/table/interface';
import { useRef, useState } from 'react';
import Highlighter from "react-highlight-words";

import { IUser } from '../store/Store';

interface IContactProps {
    getContacts?: () => void;
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

function Contacts({ userContacts }: IContactProps) {

    type DataIndex = keyof ContactsType;

    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef<InputRef>(null);


    const handleSearch = (
        selectedKeys: string[],
        confirm: (param?: FilterConfirmProps) => void,
        dataIndex: DataIndex,
    ) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters: () => void) => {
        clearFilters();
        setSearchText('');
    };

    const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<ContactsType> => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={searchInput}
                    placeholder={`Введите значение`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
                    style={{ marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Поиск
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Отмена
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({ closeDropdown: false });
                            setSearchText((selectedKeys as string[])[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        Сбросить
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered: boolean) => (
            <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
        ),
        onFilter: (value, record) =>
            record[dataIndex]
                .toString()
                .toLowerCase()
                .includes((value as string).toLowerCase()),
        onFilterDropdownOpenChange: visible => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: text =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });
    const columns: ColumnsType<ContactsType> = [
        {
            title: 'Имя',
            dataIndex: 'name',
            key: 'name',
            render: text => <a>{text}</a>,
            ...getColumnSearchProps('name'),
        },
        {
            title: 'Номер',
            dataIndex: 'mobile',
            key: 'mobile',
            ...getColumnSearchProps('mobile'),
        },
        {
            title: 'E-mail',
            dataIndex: 'email',
            key: 'email',
            ...getColumnSearchProps('email')
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
    const { userContacts, getContacts, user } = Store;

    return {
        user,
        userContacts,
        getContacts
    };
})(observer(Contacts));