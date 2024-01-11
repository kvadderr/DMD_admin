import { Form, Input, Button, App } from "antd"
import { useSignInMutation } from "../../api/auth";
import { useEffect } from "react";

const LoginForm = () => {

  const { notification } = App.useApp();
  const [signIn, { isLoading, error }] = useSignInMutation();

  const onFinish = async (values: any) => {
    signIn(values).unwrap;
  };

  useEffect(() => {
    error && notification.info({
      message: `Ошибка входа`,
      description: 'Проверьте вводимые данные',
    })
  }, [error])

  return (
    <Form name="loginForm" layout="vertical" onFinish={onFinish} autoComplete="off" >
      <Form.Item name="email" rules={[{ required: true, message: 'Введите логин!' }]}>
        <Input addonBefore="Логин" />
      </Form.Item>
      <Form.Item name="password" rules={[{ required: true, message: 'Введите пароль!' }]}>
        <Input.Password addonBefore='Пароль' />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={isLoading}>Войти</Button>
      </Form.Item>
    </Form>
  )
}

export default LoginForm