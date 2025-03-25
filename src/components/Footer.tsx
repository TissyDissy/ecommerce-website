import React from 'react';
import { Layout, Row, Col, Typography, Space } from 'antd';
import { FacebookOutlined, TwitterOutlined, InstagramOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Footer: AntFooter } = Layout;
const { Title, Text } = Typography;

const Footer: React.FC = () => {
  return (
    <AntFooter>
      <Row gutter={[24, 24]}>
        <Col xs={24} sm={12} md={6}>
          <Title level={4} style={{ color: '#fff' }}>關於我們</Title>
          <Text style={{ color: '#fff' }}>
            我們致力於提供最優質的購物體驗，讓您輕鬆找到心儀的商品。
          </Text>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Title level={4} style={{ color: '#fff' }}>客戶服務</Title>
          <Space direction="vertical">
            <Link to="/faq" style={{ color: '#fff' }}>常見問題</Link>
            <Link to="/shipping" style={{ color: '#fff' }}>運送說明</Link>
            <Link to="/returns" style={{ color: '#fff' }}>退換貨政策</Link>
            <Link to="/contact" style={{ color: '#fff' }}>聯絡我們</Link>
          </Space>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Title level={4} style={{ color: '#fff' }}>商品分類</Title>
          <Space direction="vertical">
            <Link to="/products?category=electronics" style={{ color: '#fff' }}>電子產品</Link>
            <Link to="/products?category=clothing" style={{ color: '#fff' }}>服飾</Link>
            <Link to="/products?category=home" style={{ color: '#fff' }}>居家用品</Link>
            <Link to="/products?category=books" style={{ color: '#fff' }}>圖書</Link>
          </Space>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Title level={4} style={{ color: '#fff' }}>關注我們</Title>
          <Space size="large">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FacebookOutlined style={{ color: '#fff', fontSize: 24 }} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <TwitterOutlined style={{ color: '#fff', fontSize: 24 }} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <InstagramOutlined style={{ color: '#fff', fontSize: 24 }} />
            </a>
          </Space>
        </Col>
      </Row>
      <Row justify="center" style={{ marginTop: 24 }}>
        <Col>
          <Text style={{ color: '#fff' }}>
            © {new Date().getFullYear()} 您的商店名稱. 版權所有.
          </Text>
        </Col>
      </Row>
    </AntFooter>
  );
};

export default Footer;