import React from 'react';
import { Layout, Menu, Input, Badge, Button, Dropdown } from 'antd';
import { ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';

const { Header: AntHeader } = Layout;
const { Search } = Input;

const Header: React.FC = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('token');
  const cartItems = JSON.parse(localStorage.getItem('cart') || '[]');

  const userMenu = (
    <Menu>
      <Menu.Item key="profile">
        <Link to="/profile">個人資料</Link>
      </Menu.Item>
      <Menu.Item key="orders">
        <Link to="/orders">我的訂單</Link>
      </Menu.Item>
      {isLoggedIn && (
        <Menu.Item key="logout" onClick={() => {
          localStorage.removeItem('token');
          navigate('/login');
        }}>
          登出
        </Menu.Item>
      )}
    </Menu>
  );

  return (
    <AntHeader className="header">
      <div className="logo">
        <Link to="/">
          <h1 style={{ color: '#1890ff', margin: 0 }}>商店</h1>
        </Link>
      </div>
      <Search
        placeholder="搜索商品..."
        onSearch={value => navigate(`/products?search=${value}`)}
        className="header-search"
      />
      <div className="header-actions">
        <Link to="/cart">
          <Badge count={cartItems.length}>
            <Button icon={<ShoppingCartOutlined />} />
          </Badge>
        </Link>
        {isLoggedIn ? (
          <Dropdown overlay={userMenu}>
            <Button icon={<UserOutlined />} style={{ marginLeft: 16 }} />
          </Dropdown>
        ) : (
          <Link to="/login">
            <Button type="primary" style={{ marginLeft: 16 }}>
              登入
            </Button>
          </Link>
        )}
      </div>
    </AntHeader>
  );
};

export default Header;