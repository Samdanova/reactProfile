import { inject, observer } from 'mobx-react';
import { SearchOutlined } from '@ant-design/icons';
import type { InputRef } from 'antd';
import { Button, Input, Space, Table, Modal } from 'antd';
import type { ColumnsType, ColumnType } from 'antd/es/table';
import type { FilterConfirmProps } from 'antd/es/table/interface';
import { useRef, useState, useCallback } from 'react';
import Highlighter from "react-highlight-words";
import AddEditContact from './EditAddContacts/EditContacts';
import  './Contacts.css';

interface IContactProps {
    getContacts?: () => void;
    userContacts: IContactsType[];
    loading?: boolean;
    logOut: ()=>void;
    handleDeleteContact: (id: number) => void;
}

interface IContactsType {
    id: number;
    name: string;
    phone: string;
    email: string;
}

function Contacts({ userContacts, logOut, handleDeleteContact }: IContactProps) {
    const [isAddContactModal, setIsAddContactModal] = useState(false);
    const [isEditContactModal, setIsEditContactModal] = useState(false);
    const [oneContact, setOneContact] = useState<IContactsType | null>(null);

    type DataIndex = keyof IContactsType;

    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef<InputRef>(null);


    const handleModalAddContactCancel = () => {
        setIsAddContactModal(false);
      };
    
      const handleModalEditContactCancel = () => {
        setIsEditContactModal(false);
        setOneContact(null);
      };

      const onToggleModalAdd = useCallback(() => {
        setIsAddContactModal((prevState) => !prevState);
      }, []);
    
      const onToggleModalEdit = useCallback(() => {
        setIsEditContactModal((prevState) => !prevState);
      }, []);

    const handleDelete = (id:number)=>{
        handleDeleteContact(id);
    }

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

    const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<IContactsType> => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={searchInput}
                    placeholder={`Input value`}
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
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Cancel
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
                        Discard
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
    const columns: ColumnsType<IContactsType> = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: text => <a>{text}</a>,
            ...getColumnSearchProps('name'),
        },
        {
            title: 'Number',
            dataIndex: 'mobile',
            key: 'mobile',
            ...getColumnSearchProps('phone'),
        },
        {
            title: 'E-mail',
            dataIndex: 'email',
            key: 'email',
            ...getColumnSearchProps('email')
        },
        {
            title: 'Actions',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button   className='button button__edit' onClick={(e)=>{
                        e.preventDefault();
                         setIsEditContactModal(true);
                         setOneContact(record);
                    }}>Edit</Button>
                    <Button  className='button button__delete' onClick={()=>handleDelete(record.id)}>Delete</Button>
                </Space>
            ),
        },
    ];

    return (
        <>
<div className='contacts-container'>
    <Button onClick={() => setIsAddContactModal(true)} className='button'>
        Add new contact
    </Button>
    <Table
        columns={columns}
        dataSource={userContacts}
        rowKey={(record) => record.id}
     />
    <Button onClick={logOut} className='button'>Log out</Button>
</div>
{isAddContactModal && (
    <Modal
    open={isAddContactModal} 
      title="Adding contact"
      onCancel={handleModalAddContactCancel}
      footer={null}>
      <AddEditContact
        loading={false}
        onToogleModal={onToggleModalAdd}
      />
    </Modal>
  )}

  {isEditContactModal && (
    <Modal
    open={isEditContactModal} 
      title="Editting contact"
      onCancel={handleModalEditContactCancel}
      footer={null}>
      {oneContact && (
        <AddEditContact
          oneContact={oneContact}
          loading={false}
          onToogleModal={onToggleModalEdit}
        />
      )}
    </Modal>
  )}
</>
    )
}

export default inject(({ Store }) => {
    const { userContacts, getContacts, user, logOut, handleDeleteContact } = Store;

    return {
        user,
        userContacts,
        getContacts,
        logOut,
        handleDeleteContact
    };
})(observer(Contacts));