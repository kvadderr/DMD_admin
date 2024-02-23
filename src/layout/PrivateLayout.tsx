import { Layout, Menu, theme } from 'antd';
import { useNavigate } from 'react-router-dom';


import { menuItems } from '../constsnts/menuItems';
import { useGetAllCategoryQuery } from '../api/category';
import { useGetAllMeditationQuery } from '../api/meditation';
import { useGetAllVoicesQuery } from '../api/voice';
import { useAppDispatch } from '../store/storeHooks';
import { logout } from '../store/slices/authSlice';
import { useGetAllSloganQuery } from '../api/slogan';
import { useGetAllSoundQuery } from '../api/sound';

type Props = {
  children: React.ReactNode
}

const { Content, Footer, Sider } = Layout;

const PrivateLayout = ({ children }: Props) => {

  useGetAllCategoryQuery();
  useGetAllMeditationQuery();
  useGetAllVoicesQuery();
  useGetAllSloganQuery();
  useGetAllSoundQuery();
  
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const onClick = (item: any) => {
    if (item.key === 'exit') dispatch(logout())
    navigate(item.key)
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Content style={{ padding: '48px' }}>
        <Layout
          style={{ padding: '24px 0', background: colorBgContainer, borderRadius: borderRadiusLG }}
        >
          <Sider style={{ background: colorBgContainer }} width={250}>
            <Menu
              mode="inline"
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              style={{ height: '100%' }}
              items={menuItems}
              onClick={onClick}
            />
          </Sider>
          <Content style={{ padding: '0 24px', minHeight: 280 }}>{children}</Content>
        </Layout>
      </Content>
      <Footer style={{ textAlign: 'center' }}>DMD ©2023 Admin Panel</Footer>
    </Layout>
  )
}

export default PrivateLayout