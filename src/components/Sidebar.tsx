import React from 'react';
import { Layout, Menu } from 'antd';
import { AppstoreOutlined, ShoppingOutlined, UserOutlined } from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';

const { Sider } = Layout;

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isAdmin = localStorage.getItem('isAdmin') === 'true';

  const menuItems = [
    {
      key: '/',
      icon: <AppstoreOutlined />,
      label: '首頁',
    },
    {
      key: '/products',
      icon: <ShoppingOutlined />,
      label: '商品列表',
    },
    {
      key: '/profile',
      icon: <UserOutlined />,
      label: '個人中心',
    },
  ];

  if (isAdmin) {
    menuItems.push(
      {
        key: '/admin/products',
        icon: <AppstoreOutlined />,
        label: '商品管理',
      },
      {
        key: '/admin/orders',
        icon: <ShoppingOutlined />,
        label: '訂單管理',
      }
    );
  }

  return (
    <Sider width={200} className="site-layout-background">
      <Menu
        mode="inline"
        selectedKeys={[location.pathname]}
        style={{ height: '100%', borderRight: 0 }}
        items={menuItems}
        onClick={({ key }) => navigate(key)}
      />
    </Sider>
  );
};

export default Sidebar;