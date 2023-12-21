import React, { useState } from 'react';
import { Button, Form, Input } from 'antd';
import { inject, observer } from 'mobx-react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

interface ILogin {
    handleLogin: (email: string, password: string | number) => Promise<void>;
    loading: boolean;
}

function Login({ handleLogin, loading }: ILogin) {
    const navigate = useNavigate();
    const [form] = Form.useForm();

    const onFinish = async (values: { email: string; password: string }) => {
        handleLogin(values.email, values.password)
            .then(() => navigate('/'))
            .catch((err) => console.log(err));
    };

    return (
        <>
        <div className='login_welcome'>Glad to see you! <br></br>Enter your login and password for access in your book</div>
        <div className="login-container">
            <Form
                className='login-container__form'
                form={form}
                name="login"
                onFinish={onFinish}
                scrollToFirstError
                initialValues={{
                    email: '',
                    password: '',
                }}>
                <Form.Item
                    name="email"
                    label="E-mail"
                    rules={[
                        {
                            type: 'email',
                            message: 'Incorrect format',
                        },
                        {
                            required: true,
                            message: 'Required field',
                        },
                    ]}>
                    <Input
                        placeholder="E-mail"
                        disabled={loading}
                    />
                </Form.Item>

                <Form.Item
                    name="password"
                    label="Password"
                    rules={[
                        {
                            required: true,
                            message: 'Required field',
                        },
                    ]}>
                    <Input.Password
                        placeholder="Password"
                        disabled={loading}
                    />
                </Form.Item>

                <Button
                    htmlType="submit"
                    className='login-container__button'
                    disabled={loading}
                >
                    Войти
                </Button>
            </Form>
        </div>
        </>
    );
};

export default inject(({ Store }) => {
    const { handleLogin, loading } = Store;

    return {
        handleLogin,
        loading
    };
})(observer(Login));
