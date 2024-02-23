import { UsergroupAddOutlined, SettingOutlined, LogoutOutlined, MoneyCollectOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

export const menuItems: MenuProps['items'] = [
  getItem('Приложение', 'sub1', <UsergroupAddOutlined />, [
    getItem('Все пользователи', '/users'),
    getItem('Статистика', '/statistic'),
    getItem('Слоганы', '/slogans'),
    getItem('Звуки', '/sound'),
  ]),
  getItem('Медитации', 'sub2', <SettingOutlined />, [
    getItem('Список', '/meditation'),
    getItem('Категории', '/category'),
    getItem('Голоса', '/voices')
  ]),
  getItem('Платежные системы', '/payments', <MoneyCollectOutlined />),
  getItem('Выход', 'exit', <LogoutOutlined />),
];