import React from 'react';
import './Login.scss';
import { Button, Form, Input } from 'antd';
import { inject, observer } from 'mobx-react';
import { useNavigate } from 'react-router-dom';

interface ILogin {
    handleLogin: (email: string, password: string | number) => Promise<void>;
    loading: boolean;
}

const Login: React.FC<ILogin> = ({ handleLogin, loading }) => {
    const navigate = useNavigate();
    const [form] = Form.useForm();

    const onFinish = async (values: { email: string; password: string }) => {
        handleLogin(values.email, values.password)
            .then(() => navigate('/home'))
            .catch((err) => console.log(err));
    };

    return (
        <div className="login-container">
            <Form
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
                            message: 'Допускается только E-mail',
                        },
                        {
                            required: true,
                            message: 'Обязательное поле',
                        },
                    ]}>
                    <Input
                        placeholder="E-mail"
                        disabled={loading}
                    />
                </Form.Item>

                <Form.Item
                    name="password"
                    label="Пароль"
                    rules={[
                        {
                            required: true,
                            message: 'Обязательное поле',
                        },
                    ]}>
                    <Input.Password
                        placeholder="Пароль"
                        disabled={loading}
                    />
                </Form.Item>

                <Button
                    htmlType="submit"
                    disabled={loading}
                >
                    Войти
                </Button>
            </Form>
        </div>
    );
};

export default inject(({ UserStore }) => {
    const { handleLogin, loading } = UserStore;

    return {
        handleLogin,
        loading
    };
})(observer(Login));
