import {inject, observer} from 'mobx-react';
import {Button, Form, Input} from 'antd';

interface IСontacts {
    id: number;
    name: string;
    email: string;
    phone: string;

}

interface IContactEditAddProps {
    onToogleModal: () => void;
    oneContact?: IСontacts;
    handleEditContact?: (
        id : number,
        name : string,
        email : string,
        phone : string,
    ) => void;
    handleAddContact?: (name : string, email : string, phone : string) => void;
    loading: boolean;
}

const AddEditContact: React.FC < IContactEditAddProps >= (
    {onToogleModal, oneContact, handleAddContact, handleEditContact, loading}

) => {
    const [form] = Form.useForm();
    const onFinish = (values : {
        name: string;
        email: string;
        phone: string
    }) => {
        if (oneContact) {
            handleEditContact && handleEditContact(
                oneContact.id,
                values.name,
                values.email,
                values.phone
            );
            onToogleModal();
        } else {
            handleAddContact && handleAddContact(values.name, values.email, values.phone);
            onToogleModal();
        }
    };
    return (
        <Form
            form={form}
            name="EditContact"
            onFinish={onFinish}
            initialValues={oneContact
                ? {
                    name: oneContact
                        ?.name,
                    email: oneContact
                        ?.email,
                    phone: oneContact
                        ?.phone
                }
                : {
                    name: '',
                    email: '',
                    phone: ''
                }}>
            <Form.Item
                label="Name"
                name="name"
                rules={[{
                        required: true,
                        message: 'Required field',
                        whitespace: true
                    }
                ]}>
                <Input placeholder='Name'/>
            </Form.Item>

            <Form.Item
                label="Email"
                name="email"
                rules={[
                    {
                        type: 'email',
                        message: 'Only Email'
                    }, {
                        required: true,
                        message: 'Required field'
                    }
                ]}>
                <Input placeholder='Email'/>
            </Form.Item>
            <Form.Item
                label="Mobile"
                name="phone"
                rules={[
                    {
                        required: true,
                        message: 'Required field'
                    }, {
                        pattern: new RegExp(/^((8|\+7)[- ]?)?(\(?\d{3,4}\)?[- ]?)?[\d\- ]{5,10}$/,),
                        message: 'Invalid format'
                    }
                ]}>
                <Input placeholder='Phone'/>
            </Form.Item>

            <Form.Item >
                <Button type="primary" htmlType="submit">
                    Save
                </Button>
            </Form.Item>
        </Form>
    )
}

export default inject(({Store}) => {
    const {handleEditContact, handleAddContact, loading} = Store;

    return {handleEditContact, handleAddContact, loading};
})(observer(AddEditContact));