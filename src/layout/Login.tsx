import { Layout, Flex, Image, theme } from 'antd';
import LoginForm from '../components/login/LoginForm';
import logo from '../assets/logo.jpg'
const { Content, Footer, Sider } = Layout;

const Login = () => {

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();


  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Content style={{ padding: '48px' }}>
        <Layout style={{ padding: '24px 0', background: colorBgContainer, borderRadius: borderRadiusLG }}>
          <Content style={{ padding: '0 24px', minHeight: 280, alignItems: 'center', justifyContent: 'center', display: 'flex' }}>
            <Flex align='center' gap={120}>
              <LoginForm />
            </Flex>
          </Content>
        </Layout>
      </Content>
      <Footer style={{ textAlign: 'center' }}>DMD ©2023 Admin Panel</Footer>
    </Layout>
  )
}

export default Login